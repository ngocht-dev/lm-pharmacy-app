import { useMutation } from '@tanstack/react-query';
import ordersServices, {
  CreateOrderRequest,
} from '../services/orders.services';

const QUERY_KEYS = {
  ORDERS: 'ORDERS',
} as const;

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.ORDERS, 'CREATE'],
    mutationFn: (orderData: CreateOrderRequest) =>
      ordersServices.createOrder(orderData).then((result) => result.data),
  });
};

export { QUERY_KEYS };
