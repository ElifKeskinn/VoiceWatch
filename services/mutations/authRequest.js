import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAxiosWithToken from '../apiService';

export const useSignup = () => {
  const {execute} = useAxiosWithToken();

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async userData => {
      try {
        const response = await execute('POST', 'auth/signup', userData);
        if (!response) {
          throw new Error('Kayıt başarısız');
        }
        return response;
      } catch (error) {
        console.log('Request Data:', userData);
        console.log('Error Details:', error.response || error);
        throw error;
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Kayıt işlemi başarısız oldu',
      });
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kullanıcı başarıyla kaydedildi',
      });
    },
  });
};

export const useSignin = () => {
  const {execute} = useAxiosWithToken();

  return useMutation({
    mutationKey: ['signin'],
    mutationFn: async userData => {
      try {
        console.log('Login attempt with:', userData);
        const response = await execute('POST', 'auth/login', userData, false);

        if (!response || !response.token) {
          throw new Error('Giriş başarısız');
        }

        await AsyncStorage.setItem('token', response.token);
        return response;
      } catch (error) {
        // Backend'den gelen spesifik hataları handle et
        if (error.response?.status === 404) {
          throw new Error('Kullanıcı bulunamadı. Lütfen önce kayıt olun.');
        } else if (error.response?.status === 401) {
          throw new Error('TC Kimlik No veya şifre hatalı.');
        }
        throw error;
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Giriş Başarısız',
        text2: error.message || 'Giriş yapılırken bir hata oluştu',
      });
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Hoş Geldiniz',
        text2: 'Başarıyla giriş yaptınız',
      });
    },
  });
};

export const useDeleteAccount = () => {
  const {execute} = useAxiosWithToken();

  return useMutation({
    mutationKey: ['deleteAccount'],
    mutationFn: async password => {
      try {
        const response = await execute('DELETE', 'user/delete-account', {
          password,
        });
        return response;
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('Şifre hatalı');
        }
        throw error;
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hesap Silinemedi',
        text2: error.message || 'Bir hata oluştu',
      });
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Hesap Silindi',
        text2: 'Hesabınız başarıyla silindi',
      });
    },
  });
};

export const useChangePassword = () => {
  const {execute} = useAxiosWithToken();

  return useMutation({
    mutationKey: ['changePassword'],
    mutationFn: async ({oldPassword, newPassword}) => {
      try {
        const response = await execute('POST', 'user/change-password', {
          oldPassword,
          newPassword,
        });
        return response;
      } catch (error) {
        if (error.response?.status === 401) {
          throw new Error('Mevcut şifre yanlış');
        }
        throw error;
      }
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Şifre Değiştirilemedi',
        text2: error.message || 'Bir hata oluştu',
      });
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Şifreniz başarıyla değiştirildi',
      });
    },
  });
};
