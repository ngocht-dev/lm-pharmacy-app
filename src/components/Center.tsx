import React, { ComponentProps, ReactNode } from 'react';

import { StyleSheet, View } from 'react-native';

interface Props extends ComponentProps<typeof View> {
  children: ReactNode;
}

export const Center = ({ children, ...restyleProps }: Props) => (
  <View style={[styles.container, { ...restyleProps }]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
