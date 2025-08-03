import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface CheckoutFooterProps {
  total: number;
  onCheckout: () => void;
}

const CheckoutFooter = ({ total, onCheckout }: CheckoutFooterProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.checkoutSection}>
      <View style={styles.totalContainer}>
        <AppText size={16} color={colors.text}>
          {t('checkout.total')}
        </AppText>
        <AppText size={18} color={colors.error} style={styles.totalAmount}>
          {total.toLocaleString()}₫
        </AppText>
      </View>

      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <AppText
          size={16}
          color={colors.white}
          style={styles.checkoutButtonText}
        >
          {t('checkout.checkout')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutFooter;

const styles = StyleSheet.create({
  checkoutSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.neutral0,
    backgroundColor: colors.white,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalAmount: {
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: colors.main,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontWeight: '600',
  },
});
