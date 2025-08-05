import { useInfiniteQuery } from '@tanstack/react-query';
import ordersServices, { SearchParams } from '../services/orders.services';

const QUERY_KEYS = {
  ORDERS: 'ORDERS',
} as const;

export interface OrdersOptions extends SearchParams {
  enabled?: boolean;
}
export const useOrders = (options?: OrdersOptions) => {
  const fetchOrders = async ({ pageParam = 1 }: { pageParam?: number }) => {
    const params: SearchParams = {
      ...options,
      page: pageParam,
      limit: 20,
    };

    const response = await ordersServices.getOrders(params);
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
    queryKey: [QUERY_KEYS.ORDERS, options],
    queryFn: fetchOrders,
    enabled: options?.enabled !== false,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export { QUERY_KEYS };
