// ✅ wsService.js
import {recordAudioBase64} from '../utils/audioUtils';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const WS_URL = Constants.expoConfig.extra.WS_URL;

let socket = null;
let isStreaming = false;
let stopSignal = false;
let isPaused = false; // Yeni eklenen durum değişkeni
let reconnectAttempts = 0;
let lastUri = null;

let alertPopupVisible = false;

export function setPaused(value) {
  isPaused = value;
  if (value) {
    // Alert gösterildiğinde ses kaydını durdur
    stopSignal = true;
  } else {
    // Alert kapandığında ses kaydını tekrar başlat
    stopSignal = false;
    // Ses kaydını tekrar başlat
    if (socket?.readyState === WebSocket.OPEN) {
      isStreaming = false; // streaming'i sıfırla ki yeniden başlayabilsin
    }
  }
}

export function connectWS({token}) {
  if (stopSignal) {
    console.log('❌ Durdurulmuş durumda, yeniden bağlantı yapılmadı');
    return false;
  }

  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    console.log('▶️ [WS Service] Bağlantı zaten kuruluyor veya açık');
    return true;
  }

  const urlWithToken = `${WS_URL}?token=${token}`;
  console.log('▶️ [WS Service] Bağlantı deneniyor:', urlWithToken);

  socket = new WebSocket(urlWithToken);

  socket.onopen = () => {
    console.log('▶️ [WS Service] WS bağlantısı açıldı');
    reconnectAttempts = 0;
    stopSignal = false;
  };

  socket.onclose = event => {
    console.log(
      '▶️ [WS Service] WS bağlantısı kapandı:',
      event.code,
      event.reason,
    );
    isStreaming = false;

    if (!stopSignal && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      console.log(
        `▶️ [WS Service] Yeniden bağlanma denemesi ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`,
      );
      setTimeout(() => connectWS({token}), 3000);
    }
  };

  socket.onerror = error => {
    console.error('▶️ [WS Service] WS hata:', error);
  };

  return true;
}

export function disconnectWS() {
  console.log('🛑 [WS Service] Bağlantı manuel olarak kapatılıyor');
  stopSignal = true;
  if (socket) {
    socket.close();
    socket = null;
  }
  isStreaming = false;
}

export function onAIResult(callback) {
  if (!socket) return;

  let lastResult = null;
  let lastResultTime = 0;
  const MIN_TIME_BETWEEN_ALERTS = 5000; // 5 saniye

  socket.onmessage = async msg => {
    try {
      const data = JSON.parse(msg.data);
      if (data.action === 'aiResult') {
        console.log('🎯 AI sonucu geldi:', data);
        const result = data.result;
        const prediction = data.prediction;

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
        const now = Date.now();
        const maxConfidence = Math.max(...prediction);
        const predictionIndex = prediction.indexOf(maxConfidence);

        // Sessizlik veya düşük güven skoru kontrolü
        if (result === 'silence' || maxConfidence < 0.9) {
          console.log(
            'ℹ️ Güvenli durum veya düşük güven:',
            result,
            maxConfidence,
          );
          return;
        }

        // Aynı alert'i kısa sürede tekrarlama kontrolü
        if (
          lastResult === result &&
          now - lastResultTime < MIN_TIME_BETWEEN_ALERTS
        ) {
          console.log('⏳ Alert cooldown aktif:', result);
          return;
        }

        // Sonuçları güncelle
        lastResult = result;
        lastResultTime = now;

        console.log('🚨 Tehlike algılandı:', result, 'Güven:', maxConfidence);
        callback({result});
      }
    } catch (e) {
      console.warn('⚠️ Yanıt parse edilemedi:', e.message);
    }
  };
}

export async function startSendingAudio(token, intervalMs = 2000) {
  if (isStreaming || isPaused) return; // Eğer durdurulmuşsa veya zaten çalışıyorsa başlatma

  stopSignal = false;
  isStreaming = true;

  while (!stopSignal) {
    try {
      if (isPaused) {
        console.log('⏸️ Ses kaydı duraklatıldı (Alert gösteriliyor)');
        break; // While döngüsünden çık
      }

      console.log('🎙️ Ses kaydı başlatılıyor...');
      const {base64, uri} = await recordAudioBase64(intervalMs);
      lastUri = uri;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn('⚠️ WebSocket bağlantısı kopmuş');
        break;
      }

      socket.send(
        JSON.stringify({
          action: 'aiIntegration',
          data: base64,
        }),
      );

      console.log('📤 Ses verisi gönderildi');
    } catch (err) {
      console.error('❌ Ses gönderme hatası:', err);
      break;
    }
  }

  isStreaming = false;
  console.log('🛑 Ses gönderme döngüsü sonlandı');
}
