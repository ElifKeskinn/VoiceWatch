import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.API_URL;

/**
 * Token getter
 */
const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

/**
 * API hook
 */
const useFetchWithToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (method, endpoint, body = null) => {
    setIsLoading(true);
    setError(null);

    const token = await getToken();
    const fullUrl = `${API_URL}${endpoint}`;

    // Ortak header’lar (FormData için Content-Type eklemiyoruz)
    const headers = {
      Accept: 'application/json',
      ...(token && {Authorization: `Bearer ${token}`}),
    };

    const options = {method, headers};

    if (body) {
      if (body instanceof FormData) {
        // FormData → multipart, boundary’i fetch’in halletmesine izin ver
        options.body = body;
      } else if (method !== 'GET') {
        // JSON objesi
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
      }
    }

    console.log('📌 Fetch URL:', fullUrl, options);
    const response = await fetch(fullUrl, options);
    const json = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        await AsyncStorage.removeItem('token');
        throw new Error('Yetkisiz erişim. Lütfen tekrar giriş yapın.');
      }
      throw new Error(json.message || `İstek başarısız: ${response.status}`);
    }

    setIsLoading(false);
    return json;
  };

  return {
    isLoading,
    error,
    execute,
    getToken, // ✅ EKLENDİ!
  };
};

export default useFetchWithToken;
