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
        // Resim için form data kullan
        if (userData.profilePic && userData.profilePic.startsWith('file://')) {
          const formData = new FormData();
          formData.append('profilePic', {
            uri: userData.profilePic,
            type: 'image/jpeg',
            name: 'profile.jpg',
          });
          formData.append('name', userData.name);
          formData.append('surname', userData.surname);
          formData.append('age', userData.age);
          formData.append('bloodGroup', userData.bloodGroup);

          return await execute('PATCH', 'user/me', formData);
        }

        // Normal güncelleme
        return await execute('PATCH', 'user/me', userData);
      } catch (error) {
        console.error('Profile update error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Profil güncellendiğinde cache'i güncelle
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
