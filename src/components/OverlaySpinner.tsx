import colors from '@/constants/colors';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

const OverlaySpinner = () => {
  return (
    <Modal transparent>
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <ActivityIndicator size={'large'} color={colors.main} />
      </View>
    </Modal>
  );
};

export default OverlaySpinner;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11111150',
    zIndex: 100,
  },
});
