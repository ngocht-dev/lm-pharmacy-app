import AppText from '@/components/AppText';
import ScreenContainer from '@/components/ScreenContainer';
import colors from '@/constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const OrdersScreen = () => {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <AppText size={24} color={colors.text} style={styles.title}>
          Đơn hàng
        </AppText>
        <AppText size={16} color={colors.neutral3} style={styles.subtitle}>
          Danh sách đơn hàng của bạn sẽ hiển thị ở đây
        </AppText>
      </View>
    </ScreenContainer>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
});
