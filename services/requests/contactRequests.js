import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import useAxiosWithToken from '../apiService';
import Toast from 'react-native-toast-message';

// Kullanıcının kontaklarını getirme
export const useGetContacts = () => {
  const {execute} = useAxiosWithToken();

  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      try {
        const response = await execute('GET', 'contacts');
        // API boş dönerse boş array dön
        return response.data || [];
      } catch (error) {
        console.error('Contacts fetch error:', error);
        // Hata durumunda da boş array dön
        return [];
      }
    },
    // Hata yönetimi
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Kontaklar yüklenirken bir hata oluştu',
      });
    },
  });
};

// Kontak ekleme
export const useAddContact = () => {
  const {execute} = useAxiosWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async contactData => {
      return await execute('POST', 'contacts', contactData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kontak başarıyla eklendi',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Kontak eklenemedi',
      });
    },
  });
};

// Kontak güncelleme
export const useUpdateContact = () => {
  const {execute} = useAxiosWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, data}) => {
      return await execute('PATCH', `contacts/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kontak başarıyla güncellendi',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Kontak güncellenemedi',
      });
    },
  });
};

// Kontak silme
export const useDeleteContact = () => {
  const {execute} = useAxiosWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async id => {
      return await execute('DELETE', `contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kontak başarıyla silindi',
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Kontak silinemedi',
      });
    },
  });
};
