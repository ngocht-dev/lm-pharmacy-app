import { useQuery } from '@tanstack/react-query';
import ordersServices, { SearchParams } from '../services/orders.services';

const QUERY_KEYS = {
  ORDER_DETAIL: ['ORDERS', 'DETAIL'],
} as const;

export interface OrdersOptions extends SearchParams {
  enabled?: boolean;
}
export const useOrderDetail = (id: number, fetchOnMount = true) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ORDER_DETAIL, id],
    queryFn: () =>
      ordersServices.getOrderDetail(id).then((result) => result.data),
    enabled: fetchOnMount,
  });
};

export { QUERY_KEYS };
