import { useInfiniteQuery } from '@tanstack/react-query';
import productServices, { SearchParams } from '../services/product.services';

const QUERY_KEYS = {
  PRODUCTS: 'PRODUCTS',
} as const;

export interface UseProductsOptions {
  name?: string;
  category_id?: number;
  enabled?: boolean;
}

export const useProducts = (options?: UseProductsOptions) => {
  const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const params: SearchParams = {
      name: options?.name,
      category_id: options?.category_id,
      page: pageParam,
      limit: 20,
    };

    const response = await productServices.getProducts(params);
    return {
      data: response.data?.data || [],
      nextPage:
        response.data && pageParam < response.data.lastPage
          ? pageParam + 1
          : undefined,
    };
  };

  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEYS.PRODUCTS, options?.name, options?.category_id],
    queryFn: fetchProducts,
    enabled: options?.enabled !== false,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export { QUERY_KEYS };
