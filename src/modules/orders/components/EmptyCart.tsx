import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const EmptyCart = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.emptyCart}>
      <MaterialCommunityIcons
        name="cart-outline"
        size={64}
        color={colors.neutral3}
      />
      <AppText size={18} color={colors.text} style={styles.emptyCartTitle}>
        {t('checkout.empty_cart_title')}
      </AppText>
      <AppText
        size={14}
        color={colors.neutral3}
        style={styles.emptyCartSubtitle}
      >
        {t('checkout.empty_cart_subtitle')}
      </AppText>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCartTitle: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    textAlign: 'center',
  },
});
