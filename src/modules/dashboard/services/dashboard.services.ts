import { GET } from '@/services';

export interface Category {
  id: number;
  name: string;
  icon: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

class DashboardServices {
  getCategories() {
    return GET<Category[]>('categories');
  }
}

export default new DashboardServices();
