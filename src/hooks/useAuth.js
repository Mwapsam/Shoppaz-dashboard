import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';


const useAuth = () => {
  const mutation = useMutation({
    mutationKey: ['session'],
    mutationFn: (userData) =>
      axiosInstance.post('users/api/token/', userData),
  });

  return {
    ...mutation,
    isLoading: mutation.status === 'pending',
  };
};

export default useAuth;