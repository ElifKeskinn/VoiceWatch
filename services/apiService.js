import axios from 'axios';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Her istekte token ekle
axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response interceptor - 401 hatası alırsak logout yap
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      return Promise.reject(new Error('AUTH_ERROR'));
    }
    return Promise.reject(error);
  },
);

const useAxiosWithToken = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  /**
   * API çağrısı yapan fonksiyon
   * @param {string} method - HTTP metodu (GET, POST, PUT, DELETE vb.)
   * @param {string} endpoint - API endpoint URL'i
   * @param {any} body - İstek gövdesi (opsiyonel)
   */
  const execute = async (method, endpoint, body = null) => {
    try {
      setIsLoading(true);

      const config = {
        method,
        url: endpoint,
        data: body instanceof FormData ? body : body,
      };

      // FormData için Content-Type'ı elle ayarlamaya gerek yok
      if (body instanceof FormData) {
        config.headers = {'Content-Type': 'multipart/form-data'};
      }

      const response = await axiosInstance(config);
      console.log('HTTP Durum Kodu:', response.status);
      console.log('API Yanıtı:', response.data);

      setData(response.data);
      return response.data;
    } catch (err) {
      if (err.message === 'AUTH_ERROR') {
        navigation.navigate('SignIn');
      }
      console.error('API Hatası:', err);
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    data,
    execute,
  };
};

export default useAxiosWithToken;
