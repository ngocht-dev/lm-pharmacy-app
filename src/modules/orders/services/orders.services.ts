import { GET, POST } from '@/services';

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  customer: number;
  customer_type: 'INDIVIDUAL' | 'BUSINESS';
  sale_method: 'DIRECT' | 'ONLINE';
}

export interface OrderProduct {
  id: number;
  name: string;
  code: string;
}

export interface OrderItemResponse {
  id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  product: OrderProduct;
}

export interface OrderResponse {
  id: number;
  code: string;
  total_products: number;
  total_value: number;
  discount: number;
  extra_fee: number;
  customer_type: string;
  order_status: string;
  sale_method: string;
  items: OrderItemResponse[];
  created_at: string;
  updated_at: string;
}

export interface OrdersListResponse {
  data: OrderResponse[];
  total: number;
  page: number;
  lastPage: number;
}

class OrdersServices {
  createOrder(orderData: CreateOrderRequest) {
    return POST<OrderResponse>('orders', orderData);
  }

  getOrders(params?: { page?: number; limit?: number }) {
    return GET<OrdersListResponse>('orders', params);
  }
}

export default new OrdersServices();
