import React from 'react';
import { StyleSheet, View } from 'react-native';

const Gap = () => {
  return <View style={styles.gap} />;
};

Gap.Small = () => {
  return <View style={styles.gapSmall} />;
};

Gap.Medium = () => {
  return <View style={styles.gapMedium} />;
};

Gap.large = () => {
  return <View style={styles.gapLarge} />;
};
export default Gap;

const styles = StyleSheet.create({
  gap: {
    height: 12,
    width: 12,
  },
  gapSmall: {
    height: 8,
    width: 8,
  },
  gapMedium: {
    height: 16,
    width: 16,
  },
  gapLarge: {
    height: 24,
    width: 24,
  },
});
