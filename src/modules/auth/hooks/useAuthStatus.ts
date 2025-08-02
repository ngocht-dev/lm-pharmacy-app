import storageKeys from '@/constants/storageKeys';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';

export const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await storage.getSecureItem(
          storageKeys.ACCESS_TOKEN
        );
        const refreshToken = await storage.getSecureItem(
          storageKeys.REFRESH_TOKEN
        );

        if (accessToken && refreshToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return {
    isLoading,
    isAuthenticated,
  };
};
