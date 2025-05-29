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

// Exponential backoff için değerler
const MAX_RECONNECT_ATTEMPTS = 5;
const INITIAL_RECONNECT_DELAY = 1000;
const MAX_RECONNECT_DELAY = 30000;

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
    // Durdurma sinyalini aynı anda ayarla
    stopSignal = true;
    console.log('⏸️ Ses kaydı duraklatıldı ve durdurma sinyali gönderildi');
  } else {
    stopSignal = false;
    if (socket?.readyState === WebSocket.OPEN) {
      isStreaming = false;
    }
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
  isStreaming = false;
  reconnectAttempts = 0;
  connectionState = WS_STATES.DISCONNECTED;
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

      // Kayıt kilidi
      if (isRecording) {
        console.log('⏳ Önceki kayıt hala devam ediyor, bekliyor...');
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }

      // Kayıt kilidini ayarla
      isRecording = true;

      console.log('🎙️ Ses kaydı başlatılıyor...');
      const {base64, uri} = await recordAudioBase64(intervalMs).catch(err => {
        console.error('❌ Kayıt hatası:', err);
        return {base64: null, uri: null};
      });

      // Kayıt kilidini kaldır
      isRecording = false;

      // Kayıt başarısızsa devam et
      if (!base64 || !uri) {
        continue;
      }

      lastUri = uri;

      // Socket kontrolü
      if (stopSignal) {
        console.log('🛑 Durdurma sinyali alındı, kayıt gönderilmiyor');
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
      }
    } catch (err) {
      console.error('❌ Ses gönderme hatası:', err);

      // Kayıt kilidini hataya rağmen temizle
      isRecording = false;

      // Ciddi hatalarda kısa bir bekleyiş ekle
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Döngüden çıktık, kaynakları temizle
  isStreaming = false;
  isRecording = false;
  console.log('🛑 Ses gönderme döngüsü sonlandırıldı');
}
