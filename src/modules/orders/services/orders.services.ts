import { GET, POST } from '@/services';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum SaleMethod {
  DIRECT = 'DIRECT',
  ONLINE = 'ONLINE',
}
export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  customer: number;
  customer_type: 'INDIVIDUAL' | 'BUSINESS';
  sale_method: SaleMethod;
}

export interface OrderProduct {
  id: string;
  name: string;
  code: string;
  sale_price: string;
  photo_urls?: string[];
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
  sale_method: SaleMethod;
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

export interface SearchParams {
  to_date?: string;
  from_date?: string;
  search?: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

class OrdersServices {
  createOrder(orderData: CreateOrderRequest) {
    return POST<OrderResponse>('orders', orderData);
  }

  getOrders(params?: SearchParams) {
    return GET<OrdersListResponse>('orders', params);
  }

  getOrderDetail(id: number) {
    return GET<OrderResponse>(`orders/${id}`);
  }
}

export default new OrdersServices();
