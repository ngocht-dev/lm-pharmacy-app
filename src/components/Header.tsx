import Icons from '@/assets/icons';
import colors from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AppText from './AppText';

export type HeaderProps = {
  // If return false, default goBack will trigger;
  onPressBack?: () => boolean | void;
  title?: string;
  titleStyle?: TextStyle;
  color?: string;
  backIcon?: React.ReactNode;
  renderRight?: () => React.ReactNode;
  onRightPress?: () => boolean | void;
  style?: ViewStyle;
  darkMode?: boolean;
};

const Header = ({
  title,
  titleStyle,
  onPressBack,
  onRightPress,
  backIcon,
  renderRight,
  style,
  darkMode = false,
}: HeaderProps) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={[styles.container, style]}>
      {canGoBack ? (
        <TouchableOpacity
          hitSlop={12}
          style={[darkMode ? styles.iconDarkMode : {}]}
          onPress={() => {
            const isBack = onPressBack?.();
            if (!isBack) {
              navigation.goBack();
            }
          }}
        >
          {backIcon ?? <Icons.ChevronLeft stroke={colors.mainSub2} />}
        </TouchableOpacity>
      ) : (
        <View style={{ width: 16 }} />
      )}
      <AppText size={17} style={titleStyle}>
        {title}
      </AppText>
      {renderRight ? (
        <TouchableOpacity
          style={[darkMode ? styles.iconDarkMode : {}]}
          hitSlop={12}
          onPress={() => onRightPress?.()}
        >
          {renderRight()}
        </TouchableOpacity>
      ) : (
        <View style={{ width: 16 }} />
      )}
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backTitle: {
    marginLeft: 12,
  },
  iconDarkMode: {
    backgroundColor: colors.neutral0,
    borderRadius: 16,
    padding: 2,
  },
});
