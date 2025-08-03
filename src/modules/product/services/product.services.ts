import { GET } from '@/services';

export interface ProductCategory {
  created_at: string;
  updated_at: string;
  id: number;
  name: string;
  icon: string | null;
  description: string | null;
}

export interface Product {
  created_at: string;
  updated_at: string;
  id: number;
  code: string;
  name: string;
  description: string | null;
  cost_price: string;
  sale_price: string;
  unit: string;
  category: ProductCategory;
  inventory_amount: number;
  sold_amount: number;
  photo_urls: string[];
  is_direct_sale: boolean;
  wholesale: boolean;
  manufacturer: string;
  made_in: string;
  weight: number | null;
  weight_unit: string;
  packaging: string;
  is_active: boolean;
  thumbnail_url: string | null;
}

class ProductServices {
  getAllProducts() {
    return GET<Product[]>('products/all');
  }
}

export default new ProductServices();
