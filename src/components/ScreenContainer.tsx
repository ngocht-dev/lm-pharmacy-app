import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header, { HeaderProps } from './Header';

type Props = PropsWithChildren<{
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  statusBarStyle?: StatusBarStyle;
  hideHeader?: boolean;
  headerProp?: HeaderProps;
  disableGradient?: boolean;
}>;

const ScreenContainer = ({
  containerStyle,
  style,
  children,
  statusBarStyle,
  hideHeader,
  headerProp,
  disableGradient,
}: Props) => {
  if (disableGradient) {
    return (
      <View style={[styles.container, containerStyle]}>
        <SafeAreaView style={[styles.innerView, style]}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}
            animated
            style={statusBarStyle}
          />
          {!hideHeader && <Header {...headerProp} />}
          {children}
        </SafeAreaView>
      </View>
    );
  }

  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      colors={['#FFFFFF', disableGradient ? '#FFFFFF' : '#F4EFFA']}
      locations={[0, 0.4]}
    >
      <SafeAreaView style={[styles.innerView, style]}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          animated
          style={statusBarStyle}
        />
        {!hideHeader && <Header {...headerProp} />}
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  innerView: {
    flex: 1,
  },
});
