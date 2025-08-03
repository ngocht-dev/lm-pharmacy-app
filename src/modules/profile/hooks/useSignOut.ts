import storageKeys from '@/constants/storageKeys';
import { NavigationUtil } from '@/utils/navigation';
import storage from '@/utils/storage';
import { useMutation } from '@tanstack/react-query';

export const useSignOut = () => {
  const signOutMutation = useMutation({
    mutationFn: async () => {
      // Clear all authentication tokens
      await storage.removeSecureItem(storageKeys.ACCESS_TOKEN);
      await storage.removeSecureItem(storageKeys.REFRESH_TOKEN);

      // Clear any other user-related data
      await storage.removeSecureItem(storageKeys.USER_ID);

      console.log('All tokens and user data cleared');
    },
    onSuccess: () => {
      // Reset navigation to login screen using NavigationUtil
      NavigationUtil.reset();
      console.log('Sign out successful - navigation reset to login');
    },
    onError: (error) => {
      console.error('Error during sign out:', error);
    },
  });

  const signOut = () => {
    signOutMutation.mutate();
  };

  return {
    signOut,
    isLoading: signOutMutation.isPending,
    error: signOutMutation.error,
  };
};
