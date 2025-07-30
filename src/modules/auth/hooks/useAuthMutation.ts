import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import AuthServices, { LoginCredentials } from '../services/auth.services';

// Query Keys
export const QUERY_KEYS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
} as const;

export const useLoginMutation = ({
  onError,
}: {
  onError?: (error: AxiosError) => void;
} = {}) =>
  useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: (credentials: LoginCredentials) =>
      AuthServices.login(credentials).then((result) => result.data),
    onError: onError,
  });
