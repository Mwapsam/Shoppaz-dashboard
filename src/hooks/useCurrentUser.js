import axiosInstance from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('users/api/current_user/');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Unauthorized access. Please log in.');
    } else {
      throw new Error('Error fetching current user');
    }
  }
};

const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      try {
        const res = await getCurrentUser();
        return res;
      } catch (error) {
        throw error;
      }
    },
  });
};

export default useCurrentUser;
