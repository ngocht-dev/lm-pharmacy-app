import Icons from '@/assets/icons';
import colors from '@/constants/colors';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import AppText from './AppText';
import AppTouchable from './AppTouchable';

const ToastContainer = () => {
  const config = useMemo<ToastConfig>(
    () => ({
      error: (props) => (
        <View style={styles.errorContainer}>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: 12,
              marginRight: 0,
            }}
          >
            <Icons.Warning
              width={24}
              height={24}
              color={colors.white}
              stroke={colors.white}
            />
          </View>
          <AppText style={styles.message}>{props.text1}</AppText>
        </View>
      ),
      notification: (props) => (
        <AppTouchable
          onPress={props.onPress}
          style={styles.notificationContainer}
        >
          <AppText style={styles.notiTitle}>{props.text1}</AppText>
          <AppText style={styles.notiContent}>{props.text2}</AppText>
        </AppTouchable>
      ),
    }),
    []
  );
  return (
    <Toast
      position="bottom"
      visibilityTime={5000}
      autoHide
      config={config}
      bottomOffset={15}
    />
  );
};

const showMessage =
  (type: 'success' | 'error' | 'notification') => (message: string) =>
    Toast.show({
      type,
      text1: message,
      position: 'top',
    });

export const showErrorMessage = (
  message: string = 'Something wrong, please try again later'
) => showMessage('error')(message);

export const showSuccessMessage = showMessage('success');

// export const showNotification = (notification: NotificationContent) => {
//   Toast.show({
//     type: 'notification',
//     text1: notification.title || 'Notification',
//     text2: notification.body as string,
//     position: 'top',
//   });
// };

export default memo(ToastContainer);
const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.error,
    borderRadius: 8,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 15,
    alignSelf: 'center',
    gap: 8,
  },
  message: {
    fontSize: 15,
    color: colors.white,
  },
  notificationContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    width: '95%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notiTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  notiContent: {
    fontSize: 16,
  },
});
