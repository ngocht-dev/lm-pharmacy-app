import colors from '@/constants/colors';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { OrderStatus } from '../services/orders.services';

export const OrderStatusChip = ({ status }: { status: OrderStatus }) => {
  const { t } = useTranslation();

  const orderStatusData = useMemo(() => {
    switch (status) {
      case OrderStatus.CANCELLED:
        return {
          text: t('orders.status.cancel'),
          color: colors.error,
        };
      case OrderStatus.CONFIRMED:
        return {
          text: t('orders.status.confirmed'),
          color: colors.success,
        };
      case OrderStatus.SHIPPED:
        return {
          text: t('orders.status.shipped'),
          color: '#009084ff',
        };
      case OrderStatus.PROCESSING:
        return {
          text: t('orders.status.processing'),
          color: '#4c6500ff',
        };
      case OrderStatus.PENDING:
        return {
          text: t('orders.status.pending'),
          color: '#8cb2ffff',
        };
      case OrderStatus.DELIVERED:
        return {
          text: t('orders.status.delivered'),
          color: '#f88d00ff',
        };
      default:
        return null;
    }
  }, [status, t]);

  if (!orderStatusData) {
    return null;
  }

  return (
    <View
      style={[styles.statusChip, { backgroundColor: orderStatusData.color }]}
    >
      <Text style={styles.statusText}>{orderStatusData?.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusChip: {
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
  },
});
