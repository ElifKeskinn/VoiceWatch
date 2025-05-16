import {useQuery} from '@tanstack/react-query';
import useFetchWithToken from '../apiService';

export const useGetUserInfo = () => {
  const {execute} = useFetchWithToken();

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      try {
        const response = await execute('GET', 'user/me');
        return response;
      } catch (error) {
        console.error('User info fetch error:', error);
        throw error;
      }
    },
  });
};
