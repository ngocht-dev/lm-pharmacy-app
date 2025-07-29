import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = PropsWithChildren<TouchableOpacityProps>;

const AppTouchable = (props: Props) => (
  <TouchableOpacity activeOpacity={0.8} {...props}>
    {props.children}
  </TouchableOpacity>
);

export default AppTouchable;
