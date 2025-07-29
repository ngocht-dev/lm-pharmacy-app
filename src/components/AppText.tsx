import colors from '@/constants/colors';
import React, { PropsWithChildren, ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

type Props = PropsWithChildren<{
  color?: string;
  style?: StyleProp<TextStyle>;
  size?: number;
  fontWeight?: string | number;
  onPress?: () => void;
  numberOfLines?: number;
}>;

const AppText = ({
  children,
  style: styleProp,
  size,
  fontWeight,
  color,
  onPress,
  numberOfLines,
}: Props): ReactNode => {
  const style = useMemo(() => {
    const styleFlat = StyleSheet.flatten(styleProp);
    const tempStyle: TextStyle = { ...styleFlat };
    if (size) {
      tempStyle.fontSize = size;
    }
    if (fontWeight) {
      tempStyle.fontWeight = fontWeight as any;
    }
    if (color) {
      tempStyle.color = color;
    }
    return [styles.default, tempStyle];
  }, [styleProp, size, fontWeight, color]);
  return (
    <Text
      style={style}
      onPress={onPress}
      numberOfLines={numberOfLines}
      suppressHighlighting
    >
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  default: {
    color: colors.text,
  },
});
