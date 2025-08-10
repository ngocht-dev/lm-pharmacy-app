import colors from '@/constants/colors';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { checkAuthStatus } from './authService';
import { initializeStores } from './initializeStores';

interface AppInitializerProps {
  children: React.ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Force set language to Vietnamese
        await i18n.changeLanguage('vi');

        // Initialize stores first
        await initializeStores();

        // Then check auth status
        await checkAuthStatus();

        // Mark as initialized
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing app:', error);
        // Even if there's an error, we should still render the app
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, [i18n]);

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default AppInitializer;
