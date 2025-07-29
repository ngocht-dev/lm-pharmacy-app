import colors from '@/constants/colors';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AppText from './AppText';

export type OtpRefFunction = {
  resetOtp: () => void;
};

type Props = {
  onFullfill?: (otp: string) => void;
  onChange?: (otp: string) => void;
  style?: ViewStyle;
  error?: boolean | string;
};

const size = 6;

const OtpInput = forwardRef(
  ({ onFullfill, onChange, style, error }: Props, ref) => {
    const inputRef = useRef<TextInput>(null);
    const [otp, setOtp] = useState('');
    const [focus, setFocus] = useState(false);
    const isError = Boolean(error);

    useImperativeHandle(
      ref,
      () => ({
        resetOtp() {
          setOtp('');
        },
      }),
      []
    );

    const getFocusState = (index: number) => {
      if (!focus) return false;
      if (otp.length === size) return index === size - 1;
      return otp.length === index;
    };

    return (
      <TouchableOpacity
        onPress={() => {
          inputRef.current?.focus();
        }}
        activeOpacity={0.8}
        style={style}
      >
        <TextInput
          ref={inputRef}
          maxLength={size}
          caretHidden
          value={otp}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={(text) => {
            const isValid = /^\d+$/.test(text) || !text;
            if (isValid) {
              setOtp(text);
              onChange?.(text);
              if (text.length === 6) {
                onFullfill?.(text);
              }
            }
          }}
          style={styles.input}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 12,
          }}
        >
          {new Array(size).fill('').map((item, index) => {
            const isActive = getFocusState(index);
            return (
              <View
                key={index}
                style={[
                  styles.otpItem,
                  isActive && styles.otpItemActive,
                  isError && styles.errorItem,
                ]}
              >
                <AppText size={15} style={styles.text}>
                  {otp[index]}
                </AppText>
              </View>
            );
          })}
        </View>
        {typeof error === 'string' ? (
          <AppText style={styles.errorText}>{error}</AppText>
        ) : null}
      </TouchableOpacity>
    );
  }
);

export default OtpInput;

const styles = StyleSheet.create({
  input: {
    height: 1,
    width: 1,
    position: 'absolute',
    opacity: 0,
  },
  otpItem: {
    borderWidth: 1.5,
    flexGrow: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: 'transparent',
    backgroundColor: 'white',
  },
  otpItemActive: {
    borderColor: colors.main,
  },
  errorItem: {
    borderColor: colors.error,
  },
  errorText: {
    borderColor: colors.error,
    color: colors.error,
    marginTop: 4,
  },
  text: { width: 40, textAlign: 'center', color: colors.neutral6 },
});
