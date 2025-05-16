import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

/**
 * API isteklerini token ile birlikte fetch kullanarak yapan hook.
 * Tüm servis dosyalarında bu fonksiyon kullanılabilir.
 */
const useFetchWithToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (method, endpoint, body = null) => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('token');
      const fullUrl = `${API_URL}${endpoint}`;

      console.log('📌 Fetch URL:', fullUrl);
      console.log('📌 Kullanılacak Token:', token);

      const response = await fetch(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token && {Authorization: `Bearer ${token}`}),
        },
        body: method !== 'GET' && body ? JSON.stringify(body) : null,
      });

      const json = await response.json();
      console.log('📦 FETCH sonucu:', json);

      if (!response.ok) {
        // 401 durumunda token'ı temizleyip logout tetikleyebilirsin
        if (response.status === 401) {
          await AsyncStorage.removeItem('token');
          throw new Error('Yetkisiz erişim. Lütfen tekrar giriş yapın.');
        }
        throw new Error(json.message || `İstek başarısız: ${response.status}`);
      }

      return json;
    } catch (err) {
      console.error('📌 API Hatası:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    execute,
  };
};

export default useFetchWithToken;
