import { useQuery } from '@tanstack/react-query';
import dashboardServices from '../services/dashboard.services';

// Query Keys
export const QUERY_KEYS = {
  CATEGORIES: 'CATEGORIES',
} as const;

export const useCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () =>
      dashboardServices.getCategories().then((result) => result.data),
  });
