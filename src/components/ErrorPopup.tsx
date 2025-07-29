import colors from '@/constants/colors';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';

type Props = {
  title?: string;
  message?: string;
  show?: boolean;
  onClose?: () => void;
};

const ErrorPopup = ({ show, title, message, onClose }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal visible={show} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.popup}>
          {title && (
            <View>
              <AppText style={styles.title}>{title}</AppText>
            </View>
          )}
          <View style={{ alignItems: 'center' }}>
            <AppText style={styles.message}>{message}</AppText>
          </View>
          <AppButton text={t('common.actions.close')} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default memo(ErrorPopup);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11111150',
    zIndex: 100,
  },
  popup: {
    width: '80%',
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    fontSize: 16,
    color: colors.error,
    marginVertical: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
  },
});
