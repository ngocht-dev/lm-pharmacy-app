import { useQuery } from '@tanstack/react-query';
import productServices from '../services/product.services';

const QUERY_KEYS = {
  PRODUCTS: 'PRODUCTS',
} as const;

export const useProducts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: () =>
      productServices.getAllProducts().then((result) => result.data),
  });
};

export { QUERY_KEYS };
