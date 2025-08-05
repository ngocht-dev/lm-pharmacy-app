import colors from '@/constants/colors';
import React, { ComponentProps } from 'react';

import { StyleSheet, View } from 'react-native';

export const Divider = ({ ...restyleProps }: ComponentProps<typeof View>) => (
  <View style={[styles.divider, { ...restyleProps }]}></View>
);

const styles = StyleSheet.create({
  divider: {
    marginVertical: 3,
    borderBottomWidth: 1,
    borderColor: colors.neutral1,
  },
});
