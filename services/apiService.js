import axios from 'axios';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {API_URL} from '@env';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 saniye timeout
});

// CORS hatalarını önlemek için
axiosInstance.defaults.withCredentials = false;

// Request interceptor - Her istekte token ekle
axiosInstance.interceptors.request.use(
  config => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    });
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

      // Endpoint kontrolü
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

      const config = {
        method,
        url: cleanEndpoint,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      // Body varsa ekle
      if (body) {
        config.data = body;
        
        // Veriyi logla (profilePic hariç)
        console.log('API isteği:', {
          method,
          endpoint: cleanEndpoint,
          body: {
            ...body,
            profilePic: body.profilePic ? 'base64 veri (gizlendi)' : undefined
          }
        });
      }

      const response = await axiosInstance(config);
      
      console.log('API yanıtı:', {
        status: response.status,
        url: response.config.url,
        data: response.data ? 'Veri alındı' : 'Veri yok'
      });

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
