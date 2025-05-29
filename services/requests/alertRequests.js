// services/apiService/requests/alertRequests.js
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getToken() {
  return await AsyncStorage.getItem('token');
}

const API_BASE = 'https://voicewatchbackend-production.up.railway.app/api/';

export async function sendManualAlert() {
  const token = await getToken();
  const url = `${API_BASE}alert/manual`;
  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  };

  // 👉 Burada request’i logluyoruz
  console.log('[sendManualAlert] HTTP Request:', {
    url,
    ...options
  });

  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Manuel alert oluşturulamadı', res.status);
  return res.json();
}


export async function sendBulkSms(message, numbers) {
  const token = await getToken();
  const url = `${API_BASE}alert/send-sms`;
  const body = JSON.stringify({ numbers, message });
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body
  };
  console.log('[sendBulkSms] HTTP Request:', { url, ...options });
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('SMS gönderimi başarısız');
  return res.json();
}

export async function sendAiIntegration(data) {
  const token = await getToken();
  const res = await fetch(`${API_BASE}alert/ai-integration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error('AI entegrasyon hatası');
  return res.json();
}

export async function respondAlert(alertId) {
  const token = await getToken();
  const res = await fetch(`${API_BASE}alert/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ alertId }),
  });
  if (!res.ok) throw new Error('Respond işlemi başarısız');
  return res.json();
}