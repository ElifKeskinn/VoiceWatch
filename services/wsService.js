// ✅ wsService.js
import {recordAudioBase64} from '../utils/audioUtils';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const WS_URL = Constants.expoConfig.extra.WS_URL;

let socket = null;
let isStreaming = false;
let stopSignal = false;
let isPaused = false;
let reconnectAttempts = 0;
let lastUri = null;
let _alertPopupVisible = false;
let aiResultCallback = null;

// Kayıt kilidi - aynı anda tek bir kayıt nesnesinin oluşturulmasını sağlar
let isRecording = false;
let recordingLock = false;
let lastRecordingError = 0; // Rate limit recording errors

// Exponential backoff için değerler
const MAX_RECONNECT_ATTEMPTS = 5;
const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 30000;

// Error recovery constants
const RECORDING_ERROR_COOLDOWN = 3000; // 3 seconds cooldown after recording errors
const MAX_CONSECUTIVE_ERRORS = 5;
let consecutiveErrors = 0;

// Reconnect delay hesaplama
const getReconnectDelay = attempt => {
  return Math.min(
    INITIAL_RECONNECT_DELAY * Math.pow(2, attempt),
    MAX_RECONNECT_DELAY,
  );
};

// Mesaj işleyici wrapper fonksiyonu
async function wrapHandler(msg) {
  try {
    const data = JSON.parse(msg.data);

    if (data.action === 'aiResult' && aiResultCallback) {
      console.log('🎯 AI sonucu:', data);
      const {result, prediction} = data;

      // Geçici dosyayı temizle
      if (lastUri) {
        try {
          await FileSystem.deleteAsync(lastUri, {idempotent: true});
          console.log('🧹 Geçici ses dosyası silindi:', lastUri);
          lastUri = null;
        } catch (err) {
          console.warn('⚠️ Dosya silinemedi:', err.message);
        }
      }

      // Sonucu kontrol et ve işle
      const maxConfidence = Math.max(...prediction);

      // Sessizlik veya düşük güven skoru kontrolü
      if (result === 'silence' || maxConfidence < 0.9) {
        console.log(
          'ℹ️ Güvenli durum veya düşük güven:',
          result,
          maxConfidence,
        );
        return;
      }

      // Alert gösterim kontrolü
      if (isAlertPopupVisible()) {
        console.log('⚠️ Zaten aktif bir alert var');
        return;
      }

      console.log('🚨 Tehlike algılandı:', result, 'Güven:', maxConfidence);
      aiResultCallback({result});
    } else if (data.action === 'aiError') {
      console.error('❌ AI Error:', data.message);
    }
  } catch (e) {
    console.warn('⚠️ Yanıt parse edilemedi:', e.message);
  }
}

export function setAlertPopupVisible(value) {
  _alertPopupVisible = value;
}

export function isAlertPopupVisible() {
  return _alertPopupVisible;
}

export function setPaused(value) {
  isPaused = value;
  if (value) {
    // Immediately stop any ongoing recording sessions
    stopSignal = true;
    isStreaming = false;
    console.log('⏸️ Ses kaydı duraklatıldı ve durdurma sinyali gönderildi');
  } else {
    stopSignal = false;
  }
}

// Connection state constants
const WS_STATES = {
  CONNECTING: 0,
  CONNECTED: 1,
  DISCONNECTING: 2,
  DISCONNECTED: 3,
};

let connectionState = WS_STATES.DISCONNECTED;
let connectionTimeout = null;

export function connectWS({token}) {
  // Bağlantı durumunu kontrol et
  if (stopSignal) {
    console.log('❌ Bağlantı yapılamıyor: Durdurulmuş');
    return false;
  }

  if (connectionState === WS_STATES.CONNECTING) {
    console.log('⏳ Bağlantı zaten kuruluyor');
    return false;
  }

  // Mevcut timeout'ları temizle
  if (connectionTimeout) {
    clearTimeout(connectionTimeout);
    connectionTimeout = null;
  }

  // Mevcut bağlantıyı kapat
  if (socket) {
    try {
      socket.onclose = null; // Otomatik yeniden bağlanmayı engelle
      socket.close(1000, 'Yeni bağlantı için kapatılıyor');
    } catch (err) {
      console.warn('⚠️ Önceki socket kapatılırken hata:', err);
    }
    socket = null;
  }

  connectionState = WS_STATES.CONNECTING;
  const urlWithToken = `${WS_URL}?token=${token}`;
  console.log('▶️ [WS Service] Bağlantı deneniyor:', urlWithToken);

  try {
    socket = new WebSocket(urlWithToken);

    socket.onopen = () => {
      console.log('✅ [WS Service] WS bağlantısı açıldı');
      reconnectAttempts = 0;
      stopSignal = false;
      connectionState = WS_STATES.CONNECTED;

      // Callback'i yeni bağlantıya ata
      if (aiResultCallback) {
        console.log("🔄 AI callback yeni socket'e bağlandı");
        socket.onmessage = wrapHandler;
      }
    };

    socket.onping = () => {
      socket.pong();
    };

    socket.onclose = event => {
      console.log(
        '⚪ [WS Service] WS bağlantısı kapandı:',
        event.code,
        event.reason,
      );
      isStreaming = false;
      connectionState = WS_STATES.DISCONNECTED;

      // Manuel durdurma olmadıysa yeniden bağlan
      if (!stopSignal && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        const delay = getReconnectDelay(reconnectAttempts);
        console.log(
          `🔄 [WS Service] ${delay}ms sonra yeniden bağlanılacak (deneme ${
            reconnectAttempts + 1
          }/${MAX_RECONNECT_ATTEMPTS})`,
        );

        connectionTimeout = setTimeout(() => {
          reconnectAttempts++;
          connectWS({token});
        }, delay);
      }
    };

    socket.onerror = error => {
      console.error('❌ [WS Service] WS hata:', error);
    };

    return true;
  } catch (err) {
    console.error('❌ [WS Service] Bağlantı hatası:', err);
    connectionState = WS_STATES.DISCONNECTED;
    return false;
  }
}

export function disconnectWS() {
  console.log('🛑 [WS Service] Bağlantı manuel olarak kapatılıyor');

  // Önce durdurma sinyalini ayarla
  stopSignal = true;
  isStreaming = false; // Immediately stop streaming
  
  // Reset recording flags
  isRecording = false;
  recordingLock = false;

  // Timeout'ları temizle
  if (connectionTimeout) {
    clearTimeout(connectionTimeout);
    connectionTimeout = null;
  }

  // Bağlantı durumunu güncelle
  connectionState = WS_STATES.DISCONNECTING;

  if (socket) {
    try {
      socket.onclose = null; // Otomatik yeniden bağlanmayı engelle
      socket.close(1000, 'Manuel kapatma');
    } catch (err) {
      console.warn('⚠️ Socket kapatılırken hata:', err);
    }
    socket = null;
  }

  // Diğer state'leri sıfırla
  reconnectAttempts = 0;
  connectionState = WS_STATES.DISCONNECTED;
  consecutiveErrors = 0;
}

export function onAIResult(callback) {
  console.log('⚙️ AI result callback ayarlanıyor');
  aiResultCallback = callback;

  // Eğer socket hazırsa hemen ata
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("🔄 AI callback mevcut socket'e bağlandı");
    socket.onmessage = wrapHandler;
  }
}

// Acquires recording lock with timeout
async function acquireRecordingLock(timeout = 5000) {
  // If lock is already held, wait
  if (recordingLock || isRecording) {
    console.log('⏳ Kayıt kilidi için bekleniyor...');
    
    // Wait for lock to be released with timeout
    const startTime = Date.now();
    while ((recordingLock || isRecording) && Date.now() - startTime < timeout) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // If still locked after timeout, fail
    if (recordingLock || isRecording) {
      console.log('⚠️ Kayıt kilidi zaman aşımına uğradı!');
      return false;
    }
  }
  
  // Acquire lock
  recordingLock = true;
  return true;
}

// Releases recording lock
function releaseRecordingLock() {
  recordingLock = false;
  isRecording = false;
}

export async function startSendingAudio(token, intervalMs = 2000) {
  // Zaten çalışıyorsa tekrar başlatma
  if (isStreaming) {
    console.log('⚠️ Ses kaydı zaten aktif');
    return;
  }

  if (isPaused) {
    console.log('⚠️ Kayıt duraklatılmış durumda, önce devam ettirin');
    return;
  }

  // Reset error counts
  consecutiveErrors = 0;
  
  // Durdurma sinyalini sıfırla ve yayını başlat
  stopSignal = false;
  isStreaming = true;

  console.log('🎧 Ses gönderme döngüsü başlatıldı');

  while (isStreaming && !stopSignal) {
    try {
      // Kaydı duraklat veya durdur
      if (isPaused || stopSignal) {
        console.log('⏸️ Ses kaydı duraklatıldı veya durduruldu');
        break;
      }

      // Rate limiting for recording attempts after errors
      const now = Date.now();
      if (now - lastRecordingError < RECORDING_ERROR_COOLDOWN) {
        console.log(`⏳ Kayıt hatası nedeniyle bekleniyor (${RECORDING_ERROR_COOLDOWN}ms)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      // Bağlantı durumunu kontrol et
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn(
          '⚠️ WebSocket bağlantısı kopmuş, yeniden bağlanmayı deniyorum...',
        );

        // WebSocket bağlantısını yeniden kurma girişimi
        const connected = await connectWS({token});

        if (!connected) {
          console.log('⏳ Yeniden bağlantı başarısız, 1 saniye bekleniyor...');
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      }

      // Acquire recording lock - wait if another recording is in progress
      if (!await acquireRecordingLock()) {
        console.log('⚠️ Kayıt kilidi alınamadı, tekrar deneniyor...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue;
      }

      try {
        console.log('🎙️ Ses kaydı başlatılıyor...');
        isRecording = true;
        
        const {base64, uri} = await recordAudioBase64(intervalMs);
        
        // Record completed successfully, reset error count
        consecutiveErrors = 0;
        lastUri = uri;
        
        // Socket kontrolü
        if (stopSignal) {
          console.log('🛑 Durdurma sinyali alındı, kayıt gönderilmiyor');
          if (uri) {
            try {
              await FileSystem.deleteAsync(uri, {idempotent: true});
            } catch (err) {
              console.warn('⚠️ Geçici dosya silinemedi:', err.message);
            }
          }
          break;
        }

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              action: 'aiIntegration',
              data: base64,
            }),
          );
          console.log('📤 Ses verisi gönderildi');
        } else {
          console.warn('⚠️ Ses verisi gönderilemedi: Socket bağlı değil');
          if (uri) {
            try {
              await FileSystem.deleteAsync(uri, {idempotent: true});
            } catch (err) {
              console.warn('⚠️ Geçici dosya silinemedi:', err.message);
            }
          }
        }
      } catch (err) {
        console.error('❌ Kayıt hatası:', err);
        lastRecordingError = Date.now();
        consecutiveErrors++;
        
        // If too many consecutive errors, take a longer break
        if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
          console.log(`⚠️ ${MAX_CONSECUTIVE_ERRORS} ardışık hata, uzun mola veriliyor...`);
          await new Promise(resolve => setTimeout(resolve, 5000));
          consecutiveErrors = 0;
        }
      } finally {
        // Always release locks when done
        isRecording = false;
        releaseRecordingLock();
      }
    } catch (err) {
      console.error('❌ Ses gönderme ana hatası:', err);
      
      // Kayıt kilidini hataya rağmen temizle
      isRecording = false;
      releaseRecordingLock();

      // Ciddi hatalarda kısa bir bekleyiş ekle
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Döngüden çıktık, kaynakları temizle
  isStreaming = false;
  isRecording = false;
  recordingLock = false;
  console.log('🛑 Ses gönderme döngüsü sonlandırıldı');
}
