import colors from '@/constants/colors';
import useGlobalLoading from '@/store/useGlobalLoading';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const GlobalLoading = () => {
  const { isLoading } = useGlobalLoading();

  if (!isLoading) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator size="large" color={colors.main} />
    </View>
  );
};

export default GlobalLoading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11111150',
    zIndex: 100,
    elevation: 100,
  },
});
