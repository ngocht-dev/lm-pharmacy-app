import storageKeys from '@/constants/storageKeys';
import { setGlobalAccessToken } from '@/services';
import storage from '@/utils/storage';
import { useAuthStore } from './appStore';

export const checkAuthStatus = async () => {
  const { setAuthenticated, setLoading } = useAuthStore.getState();

  try {
    setLoading(true);

    const accessToken = await storage.getSecureItem(storageKeys.ACCESS_TOKEN);
    const refreshToken = await storage.getSecureItem(storageKeys.REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      // Set the global access token for axios requests
      setGlobalAccessToken(accessToken);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    setAuthenticated(false);
  } finally {
    setLoading(false);
  }
};
