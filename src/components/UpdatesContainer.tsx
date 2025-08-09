import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';

export default function UpdatesContainer() {
  const { t } = useTranslation();
  const [showReload, setShowReload] = useState(false);
  const {
    isUpdateAvailable,
    isUpdatePending,
    isDownloading,
    downloadedUpdate,
  } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdateAvailable) {
      setShowReload(true);
    }
  }, [isUpdateAvailable]);

  const onReload = () => {
    Updates.reloadAsync();
  };

  return (
    <Modal
      visible={showReload}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <View>
            <AppText style={styles.title}>{t('updates.title')}</AppText>
          </View>
          <View style={styles.centered}>
            <AppText style={styles.message}>
              {isDownloading
                ? t('updates.downloading')
                : downloadedUpdate
                  ? t('updates.please_reload')
                  : t('updates.error')}
            </AppText>
          </View>
          {isUpdatePending && (
            <AppButton text={t('updates.reload')} onPress={onReload} />
          )}
        </View>
      </View>
    </Modal>
  );
}

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
    marginVertical: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: 600,
  },
  centered: {
    alignItems: 'center',
  },
});
