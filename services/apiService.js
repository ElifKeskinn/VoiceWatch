import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    console.log("📌 AsyncStorage'dan Alınan Token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Backtick kullandığından emin ol
    }
    console.log("📌 Gönderilecek Request Config:", config);
    return config;
  },
  error => Promise.reject(error),
);


axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response?.status;

    if (status === 401) {
      console.error('🔴 [401] Yetkisiz Erişim:', error);
      await AsyncStorage.removeItem('token');
      return Promise.reject(new Error('Yetkisiz erişim! Lütfen tekrar giriş yapın.'));
    }

    return Promise.reject(error);
  }
);

const useAxiosWithToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (method, endpoint, body = null) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const config = {
        method,
        url: endpoint,
        data: body,
        validateStatus: status => status >= 200 && status < 500,
      };

      if (method.toLowerCase() === 'delete' && body === null) {
        delete config.data;
      }


  
      console.log("📌 API Request Config:", config);
  
      const response = await axiosInstance(config);
  
      console.log("📌 API Response:", response);
  
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
  
      throw new Error(response.data?.message || `İstek başarısız: ${response.status}`);
    } catch (err) {
      console.error("📌 API Error:", err);
      setError(err.response?.data?.message || err.message);
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

export default useAxiosWithToken;