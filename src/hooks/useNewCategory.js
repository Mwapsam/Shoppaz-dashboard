import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';

function useNewCategory() {
    const mutation = useMutation({
        mutationKey: ['new-category'],
        mutationFn: (data) =>
          axiosInstance.post('api/categories/', data),
      });
    
      return {
        ...mutation,
        isLoading: mutation.status === 'pending',
      };
}

export default useNewCategory