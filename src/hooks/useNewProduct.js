import axiosInstance from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';

function useNewProduct() {
    const mutation = useMutation({
        mutationKey: ['new-product'],
        mutationFn: (data) =>
          axiosInstance.post('api/products/', data),
      });
    
      return {
        ...mutation,
        isLoading: mutation.status === 'pending',
      };
}

export default useNewProduct