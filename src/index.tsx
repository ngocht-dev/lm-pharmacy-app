import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppInitializer from './app/AppInitializer';
import GlobalLoading from './components/GlobalLoading';
import ToastContainer from './components/ToastContainer';
import UpdatesContainer from './components/UpdatesContainer';
import RootNavigation from './navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 3000,
    },
  },
});

export default function MainApp() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar translucent backgroundColor="transparent" />
        <AppInitializer>
          <RootNavigation />
        </AppInitializer>
        <GlobalLoading />
        <ToastContainer />
        <UpdatesContainer />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
