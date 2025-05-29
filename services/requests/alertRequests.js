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
  try {
    const token = await getToken();
    // Token kontrolü ekle
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    // Numara kontrolü ekle
    if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
      throw new Error('Geçerli telefon numarası bulunamadı');
    }

    // Boş/null numaraları filtrele
    const validNumbers = numbers.filter(num => num && typeof num === 'string');

    const url = `${API_BASE}alert/send-sms`;
    const body = JSON.stringify({ 
      numbers: validNumbers,
      message 
    });

    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` 
      },
      body
    };

    console.log('[sendBulkSms] Request:', {
      url,
      headers: options.headers,
      numbers: validNumbers,
      message
    });

    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok) {
      console.error('[sendBulkSms] Error response:', data);
      throw new Error(data.message || 'SMS gönderimi başarısız');
    }

    return data;
  } catch (err) {
    console.error('[sendBulkSms] Error:', err);
    throw err;
  }
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