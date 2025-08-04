import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';

interface SuccessModalProps {
  visible: boolean;
  onViewOrders: () => void;
  onContinueShopping: () => void;
}

const SuccessModal = ({
  visible,
  onViewOrders,
  onContinueShopping,
}: SuccessModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinueShopping}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color={colors.success}
            />
          </View>

          <AppText size={20} color={colors.text} style={styles.title}>
            {t('checkout.order_created_successfully')}
          </AppText>

          <View style={styles.buttonContainer}>
            <AppButton
              text={t('checkout.view_orders')}
              onPress={onViewOrders}
              style={styles.viewOrdersButton}
              size={14}
            />
            <AppButton
              text={t('checkout.continue_shopping')}
              onPress={onContinueShopping}
              style={styles.continueButton}
              size={14}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 32,
    alignItems: 'center',
    width: '85%',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  viewOrdersButton: {
    flex: 1,
  },
  continueButton: {
    flex: 1,
    backgroundColor: colors.neutral0,
  },
});

export default SuccessModal;
