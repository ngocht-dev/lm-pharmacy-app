import { useQuery } from '@tanstack/react-query';
import authServices from '../services/auth.services';

const QUERY_KEYS = {
  USER_INFO: 'USER_INFO',
} as const;

export const useUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: () => authServices.getMe().then((result) => result.data),
  });
};

export { QUERY_KEYS };
