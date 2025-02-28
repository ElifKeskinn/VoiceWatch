import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useAxiosWithToken from '../apiService';
export const useUpdateUserProfile = () => {
  const {execute} = useAxiosWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateProfile'],
    mutationFn: async userData => {
      try {
        // Normal JSON objesi olarak gönder
        const updateData = {
          name: userData.name || '',
          surname: userData.surname || '',
          age: userData.age ? String(userData.age) : '',
          bloodGroup: userData.bloodGroup || '',
          profilePic: userData.profilePic || '', // Base64 string veya boş string
        };

        return await execute('PATCH', 'user/me', updateData);
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Profil bilgileriniz güncellendi',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Profil güncellenemedi',
      });
    },
  });
};