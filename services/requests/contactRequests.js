import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import useFetchWithToken from '../apiService';
import Toast from 'react-native-toast-message';

export const useGetContacts = () => {
  const {execute} = useFetchWithToken();

  return useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      try {
        const response = await execute('GET', 'contacts');
        return response;
      } catch (error) {
        console.error('User info fetch error:', error);
        throw error;
      }
    },
    // Otomatik yenilemeyi kapat
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    staleTime: Infinity, // Veriyi asla stale olarak işaretleme
  });
};

// Kontak ekleme
export const useAddContact = () => {
  const {execute} = useFetchWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async contactData => {
      return await execute('POST', 'contacts', contactData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']); // Cache'i yenile
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
  const {execute} = useFetchWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({id, data}) => {
      if (!id || !data) {
        throw new Error('Geçersiz kontak bilgisi');
      }

      try {
        const response = await execute('PATCH', `contacts/${id}`, data);
        return response;
      } catch (error) {
        console.error('Update contact error:', {
          id,
          data,
          error: error.message,
          response: error.response?.data,
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']); // Cache'i yenile
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kontak başarıyla güncellendi',
        position: 'bottom',
        visibilityTime: 3000,
      });
    },
    onError: error => {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Kontak güncellenemedi',
        position: 'bottom',
        visibilityTime: 4000,
      });
    },
  });
};

export const useDeleteContact = () => {
  const { execute } = useFetchWithToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: id => {
      const endpoint = `contacts/${id}`; // Backtick kullanarak endpoint'i oluşturduğundan emin ol
      console.log("📌 DELETE isteği gönderilecek endpoint:", endpoint);
      return execute('DELETE', endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
      Toast.show({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kontak başarıyla silindi',
      });
    },
    onError: error => {
      console.error("📌 DELETE isteği hatası:", error);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: error.response?.data?.message || 'Kontak silinemedi',
      });
    },
  });
};