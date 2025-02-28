import {useMutation, useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useAxiosWithToken from '../apiService';

export const useUpdateUserProfile = () => {
  const {execute} = useAxiosWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async userData => {
      try {
        // API'ye gönderilecek veriyi hazırla
        const requestData = {
          name: userData.name,
          surname: userData.surname,
          age: userData.age ? Number(userData.age) : undefined,
          bloodGroup: userData.bloodGroup
        };
        
        // Base64 resim kontrolü
        if (userData.profilePic) {
          // Eğer URI ise Base64'e çevir
          if (userData.profilePic.startsWith('file:')) {
            try {
              const response = await fetch(userData.profilePic);
              const blob = await response.blob();
              
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  // Base64 veriyi al ve prefix'i kaldır
                  const base64data = reader.result.split(',')[1];
                  requestData.profilePic = base64data; // Sadece base64 veriyi ekle
                  
                  console.log("Resim base64 formatına dönüştürüldü");
                  
                  // API isteğini gönder
                  execute('PATCH', 'user/me', requestData)
                    .then(resolve)
                    .catch(reject);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
            } catch (error) {
              console.error("Resim dönüştürme hatası:", error);
              throw error;
            }
          } 
          // Zaten base64 ise doğrudan ekle
          else if (userData.profilePic.startsWith('data:image')) {
            // Prefix'i kaldır
            const base64data = userData.profilePic.split(',')[1];
            requestData.profilePic = base64data;
          }
        }

        // Normal güncelleme isteği yap
        console.log("Profil güncelleniyor:", {
          ...requestData, 
          hasProfilePic: !!requestData.profilePic
        });
        
        return await execute('PATCH', 'user/me', requestData);
      } catch (error) {
        console.error('Profil güncelleme hatası:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
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
