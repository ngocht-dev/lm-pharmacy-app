import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';

interface ConfirmOrderModalProps {
  visible: boolean;
  total: number;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmOrderModal = ({
  visible,
  total,
  isPending,
  onConfirm,
  onCancel,
}: ConfirmOrderModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="cart-outline" size={48} color={colors.main} />
          </View>

          <AppText size={18} color={colors.text} style={styles.title}>
            {t('checkout.confirm_order')}
          </AppText>

          <AppText size={14} color={colors.neutral3} style={styles.subtitle}>
            {t('checkout.confirm_order_message')}
          </AppText>

          <View style={styles.totalContainer}>
            <AppText size={16} color={colors.text} style={styles.totalLabel}>
              {t('checkout.total')}:
            </AppText>
            <AppText size={18} color={colors.main} style={styles.totalValue}>
              ${total}
            </AppText>
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              text={t('common.cancel')}
              onPress={onCancel}
              style={styles.cancelButton}
              size={14}
              variant="secondary"
            />
            <AppButton
              text={t('checkout.confirm_order')}
              onPress={onConfirm}
              disabled={isPending}
              style={styles.confirmButton}
              size={14}
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.neutral0,
    borderRadius: 8,
  },
  totalLabel: {
    marginRight: 8,
  },
  totalValue: {
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.neutral0,
  },
  confirmButton: {
    flex: 1,
  },
});

export default ConfirmOrderModal;
