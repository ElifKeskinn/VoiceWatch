import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useAxiosWithToken from '@/services/apiService';

export const useSignup = () => {
  const {execute} = useAxiosWithToken();

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async userData => {
      const response = await execute('POST', '/auth/signup', userData);
      if (!response) {
        throw new Error('Kayıt başarısız');
      }

      return response;
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
