import * as Updates from 'expo-updates';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import AppButton from './AppButton';
import AppText from './AppText';

export default function UpdatesContainer() {
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
            <AppText style={styles.title}>Update available</AppText>
          </View>
          <View style={{ alignItems: 'center' }}>
            <AppText style={styles.message}>
              {isDownloading
                ? 'Dowloading update...'
                : downloadedUpdate
                  ? 'Please reload to update'
                  : 'Update has error, please restart'}
            </AppText>
          </View>
          {isUpdatePending && <AppButton text={'Reload'} onPress={onReload} />}
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
});
