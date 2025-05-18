import { recordAudioBase64 } from '../utils/audioUtils';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';

const WS_URL = Constants.expoConfig.extra.WS_URL;
let socket = null;
let isStreaming = false;
let stopSignal = false;

let lastUri = null; // ✅ Son kaydın URI'sini saklıyoruz

export function connectWS({ token }) {
  const urlWithToken = `${WS_URL}?token=${token}`;
  socket = new WebSocket(urlWithToken);

  socket.onopen = () => {
    console.log('▶️ [WS Service] WS bağlantısı açıldı');
  };

  socket.onclose = () => {
    console.log('▶️ [WS Service] WS bağlantısı kapandı');
    isStreaming = false;
  };

  socket.onerror = (e) => {
    console.error('▶️ [WS Service] WS hata:', e.message);
  };
}

export function disconnectWS() {
  stopSignal = true;
  if (socket) {
    socket.close();
    socket = null;
  }
  isStreaming = false;
}

export function onAIResult(callback) {
  if (!socket) return;

  socket.onmessage = async (msg) => {
    try {
      const data = JSON.parse(msg.data);
      if (data.action === 'aiResult') {
        callback({ result: data.result, alertId: data.alertId });

        // ✅ AI yanıtı alındı → önceki dosyayı sil
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
  isStreaming = true;
  stopSignal = false;

  while (!stopSignal) {
    try {
      const { base64, uri } = await recordAudioBase64(intervalMs);
      lastUri = uri;

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn('⚠️ WebSocket açık değil, veri gönderilemedi.');
        continue;
      }

      socket.send(JSON.stringify({
        action: 'aiIntegration',
        data: base64,
      }));
    } catch (err) {
      console.error('▶️ [WS Service] Audio gönderme hatası:', err);
    }
  }

  console.log('▶️ [WS Service] Audio gönderme durduruldu');
}
