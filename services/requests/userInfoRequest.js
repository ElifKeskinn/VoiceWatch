import {useQuery} from '@tanstack/react-query';
import useAxiosWithToken from '../apiService';

export const useGetUserInfo = () => {
  const {execute} = useAxiosWithToken();

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
