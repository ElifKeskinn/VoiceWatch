import { recordAudioBase64 } from '../utils/audioUtils';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const WS_URL = Constants.expoConfig.extra.WS_URL;

let socket = null;
let isStreaming = false;
let stopSignal = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

let lastUri = null;

export function connectWS({ token }) {
  if (stopSignal) {
    console.log('❌ Durdurulmuş durumda, yeniden bağlantı yapılmadı');
    return false;
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log('▶️ [WS Service] Zaten bağlantı açık');
    return true;
  }

  const urlWithToken = `${WS_URL}?token=${token}`;
  console.log('▶️ [WS Service] Bağlantı deneniyor:', urlWithToken);

  socket = new WebSocket(urlWithToken);

  socket.onopen = () => {
    console.log('▶️ [WS Service] WS bağlantısı açıldı');
    reconnectAttempts = 0;
  };

  socket.onclose = event => {
    console.log('▶️ [WS Service] WS bağlantısı kapandı:', event.code, event.reason);
    isStreaming = false;

    if (!stopSignal && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      reconnectAttempts++;
      console.log(`▶️ [WS Service] Yeniden bağlanma denemesi ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS}`);
      setTimeout(() => connectWS({ token }), 3000);
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

  socket.onmessage = async msg => {
    try {
      const data = JSON.parse(msg.data);
      if (data.action === 'aiResult') {
        callback({ result: data.result, alertId: data.alertId });

        if (lastUri) {
          try {
            await FileSystem.deleteAsync(lastUri, { idempotent: true });
            console.log('🧹 Geçici ses dosyası silindi:', lastUri);
            lastUri = null;
          } catch (err) {
            console.warn('⚠️ Dosya silinemedi:', err.message);
          }
        }
      }
    } catch (e) {
      console.warn('⚠️ Yanıt parse edilemedi:', e.message);
    }
  };
}

export async function startSendingAudio(token, intervalMs = 2000) {
  if (isStreaming) return;

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.log('▶️ [WS Service] WebSocket bağlantısı yeniden kuruluyor...');
    const connected = connectWS({ token });
    if (!connected) {
      console.error('▶️ [WS Service] WebSocket bağlantısı kurulamadı');
      return;
    }

    await new Promise(resolve => {
      const waitForOpen = () => {
        if (socket?.readyState === WebSocket.OPEN) return resolve();
        setTimeout(waitForOpen, 100);
      };
      waitForOpen();
    });
  }

  isStreaming = true;
  stopSignal = false;

  while (!stopSignal) {
    try {
      console.log('🎙️ Ses kaydı başlatılıyor...');
      const { base64, uri } = await recordAudioBase64(intervalMs);
      lastUri = uri;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn('⚠️ WebSocket bağlantısı kopmuş, yeniden deneniyor...');
        connectWS({ token });
        continue;
      }

      socket.send(
        JSON.stringify({
          action: 'aiIntegration',
          data: base64,
        }),
      );

      console.log('📤 Ses verisi gönderildi');
    } catch (err) {
      console.error('▶️ [WS Service] Ses gönderme hatası:', err);
    }
  }

  console.log('🛑 [WS Service] Ses gönderme döngüsü sona erdi');
}
