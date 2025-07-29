import Icons from '@/assets/icons';
import colors from '@/constants/colors';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import {
  EnterKeyHintTypeOptions,
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';
import AppText from './AppText';
import AppTouchable from './AppTouchable';

type Props = {
  name?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChangeField?: (fieldName: string, text: string) => void;
  onFocusField?: (fieldName: string) => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
  multiline?: boolean | undefined;
  error?: string | boolean;
  defaultValue?: string;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  IconLeft?: React.FC<SvgProps>;
  renderLeftIcon?: () => React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  IconRight?: React.FC<SvgProps>;
  onPressRightIcon?: () => void;
  isBorderInfocus?: boolean;
  onSubmit?: (text: string) => void;
  enterKeyHint?: EnterKeyHintTypeOptions;
  title?: string;
};

const AppTextInput = forwardRef<TextInput, Props>(
  (
    {
      name,
      placeholder,
      onChangeText,
      onChangeField,
      onFocusField,
      value,
      style,
      containerStyle,
      keyboardType,
      secureTextEntry,
      multiline,
      error,
      defaultValue,
      disabled,
      autoCapitalize,
      IconLeft,
      renderLeftIcon,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onPressRightIcon,
      IconRight,
      isBorderInfocus,
      onSubmit,
      enterKeyHint,
      title,
    }: Props,
    ref
  ) => {
    const [focusState, setFocusState] = useState(false);
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
      if (defaultValue) {
        onChangeText?.(defaultValue);
        if (name) {
          onChangeField?.(name, defaultValue);
        }
      }
    }, [defaultValue, name, onChangeField, onChangeText]);

    const isError = Boolean(error);

    const onFocus = () => {
      setFocusState(true);
      onFocusProp?.();
      if (name && onFocusField) onFocusField(name);
    };

    const onBlur = () => {
      setFocusState(false);
      onBlurProp?.();
    };

    return (
      <View style={[styles.fullWidth, containerStyle]}>
        {title ? (
          <AppText color={colors.neutral3} size={15} style={styles.title}>
            {title}
          </AppText>
        ) : null}
        <Animated.View
          layout={LinearTransition}
          style={[
            styles.container,
            isBorderInfocus && {
              borderColor: colors.neutral1,
            },
            focusState && styles.focus,
            isError && styles.errorContainer,
            style,
          ]}
        >
          {renderLeftIcon
            ? renderLeftIcon()
            : IconLeft && (
                <View style={styles.icon}>
                  <IconLeft
                    stroke={focusState ? colors.main : colors.neutral2}
                  />
                </View>
              )}
          <TextInput
            ref={ref} // Forward the ref to the TextInput
            style={[
              styles.input,
              multiline && styles.multiline,
              disabled && styles.textDisabled,
            ]}
            value={value}
            defaultValue={defaultValue}
            onChangeText={(text) => {
              onChangeText?.(text);
              if (name && onChangeField) {
                onChangeField(name, text);
              }
            }}
            secureTextEntry={secureTextEntry ? !showPass : undefined}
            keyboardType={keyboardType}
            enterKeyHint={enterKeyHint}
            multiline={multiline}
            aria-disabled={disabled}
            editable={!disabled}
            placeholder={placeholder}
            autoCapitalize={autoCapitalize}
            onFocus={onFocus}
            onBlur={onBlur}
            onSubmitEditing={(e) => onSubmit?.(e.nativeEvent.text)}
          />
          {secureTextEntry ? (
            showPass ? (
              <AppTouchable
                style={styles.icon}
                onPress={() => setShowPass(false)}
              >
                <Icons.EyeClosed
                  stroke={focusState ? colors.main : colors.neutral2}
                  onPress={onPressRightIcon}
                />
              </AppTouchable>
            ) : (
              <AppTouchable
                style={styles.icon}
                onPress={() => setShowPass(true)}
              >
                <Icons.EyeOpen
                  stroke={focusState ? colors.main : colors.neutral2}
                  onPress={onPressRightIcon}
                />
              </AppTouchable>
            )
          ) : (
            IconRight && (
              <View style={styles.icon}>
                <IconRight
                  stroke={focusState ? colors.main : colors.neutral2}
                  onPress={onPressRightIcon}
                />
              </View>
            )
          )}
        </Animated.View>
        {isError && typeof error === 'string' && (
          <AppText color={colors.error} style={styles.error}>
            {error}
          </AppText>
        )}
      </View>
    );
  }
);

AppTextInput.displayName = 'AppTextInput';

export default memo(AppTextInput);

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.neutral0,
  },
  focus: {
    borderColor: colors.main,
  },
  errorContainer: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    color: colors.text,
    padding: 0,
    flexGrow: 1,
    fontSize: 15,
    marginLeft: 12,
    marginRight: 6,
  },
  multiline: {
    minHeight: 60,
  },
  error: {
    marginTop: 6,
  },
  textDisabled: {
    color: colors.neutral2,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    marginBottom: 4,
  },
});
