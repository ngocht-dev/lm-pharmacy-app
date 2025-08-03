import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import colors from '@/constants/colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const DiscountSection = () => {
  const { t } = useTranslation();

  const handleApplyDiscount = () => {
    // TODO: Implement discount code logic
    console.log('Applying discount code');
  };

  return (
    <View style={styles.discountSection}>
      <AppText size={16} color={colors.text} style={styles.sectionTitle}>
        {t('checkout.discount_code')}
      </AppText>
      <View style={styles.discountInputContainer}>
        <AppTextInput
          name="discountCode"
          placeholder={t('checkout.enter_discount_code')}
          style={styles.discountInput}
        />
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyDiscount}
        >
          <AppText size={14} color={colors.white}>
            {t('checkout.apply')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DiscountSection;

const styles = StyleSheet.create({
  discountSection: {
    marginTop: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  discountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  discountInput: {
    flex: 1,
    backgroundColor: colors.neutral0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  applyButton: {
    backgroundColor: colors.main,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
