import colors from '@/constants/colors';
import React, { memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import AppText from './AppText';

type Props = {
  text: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'gold' | 'white';
  style?: ViewStyle;
  disabled?: boolean;
};

const AppButton = ({
  disabled,
  text,
  onPress,
  variant = 'primary',
  style,
}: Props) => {
  const theme = useMemo(() => {
    if (variant === 'secondary') {
      return {
        containerStyle: {
          backgroundColor: colors.white,
          borderColor: !disabled ? colors.main : colors.neutral2,
        },
        textStyle: {
          color: !disabled ? colors.main : colors.neutral2,
        },
      };
    }
    return {
      containerStyle: {
        backgroundColor: !disabled ? colors.main : colors.neutral2,
        borderColor: !disabled ? colors.main : colors.neutral2,
      },
      textStyle: {
        color: colors.white,
      },
    };
  }, [variant, disabled]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, theme.containerStyle, style]}
    >
      <AppText style={theme.textStyle} size={17} fontWeight={700}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

export default memo(AppButton);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
  },
});
