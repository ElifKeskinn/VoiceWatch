import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useFetchWithToken from '../apiService';

export const useUpdateUserProfile = () => {
  const { execute } = useFetchWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async (formData) => {
      return await execute('PATCH', 'user/me', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Profil bilgileriniz güncellendi',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Profil güncellenemedi',
      });
    },
  });
};