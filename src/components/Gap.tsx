import React from 'react';
import { StyleSheet, View } from 'react-native';

const Gap = () => {
  return <View style={styles.gap} />;
};

Gap.Small = () => {
  return <View style={styles.gapSmall} />;
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
});
