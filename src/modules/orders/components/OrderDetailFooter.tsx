import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SaleMethod } from '../services/orders.services';

interface CheckoutFooterProps {
  saleMethod: SaleMethod;
  onReorder: () => void;
}

const OrderDetailFooter = ({ saleMethod, onReorder }: CheckoutFooterProps) => {
  const { t } = useTranslation();

  const method = useMemo(() => {
    switch (saleMethod) {
      case SaleMethod.DIRECT:
        return t('order_detail.sale_method.direct');
      default:
        return t('order_detail.sale_method.online');
    }
  }, [saleMethod, t]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <AppText size={16} color={colors.text}>
          {t('order_detail.sale_method.title')}
        </AppText>
        <AppText size={18} color={colors.error} style={styles.methodText}>
          {method}
        </AppText>
      </View>

      <TouchableOpacity style={styles.button} onPress={onReorder}>
        <AppText size={16} color={colors.white} style={styles.buttonText}>
          {t('order_detail.reorder')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDetailFooter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral0,
    backgroundColor: colors.white,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  methodText: {
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.main,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
});
