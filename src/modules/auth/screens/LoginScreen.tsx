import Icons from '@/assets/icons';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import AppTouchable from '@/components/AppTouchable';
import Gap from '@/components/Gap';
import ScreenContainer from '@/components/ScreenContainer';
import colors from '@/constants/colors';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const onChangeField = (fieldName: string, text: string) => {
    if (fieldName === 'email') {
      setEmail(text);
    } else if (fieldName === 'password') {
      setPassword(text);
    }

    // Clear error when user starts typing
    if (errors[fieldName as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login with:', { email, password });
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log('Forgot password');
  };

  const handleSignUp = () => {
    // TODO: Navigate to sign up screen
    console.log('Navigate to sign up');
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>{/* <Icons.Logo /> */}</View>
        <Gap />
        <AppText color={colors.neutral3} size={20}>
          Welcome to Pharmacy
        </AppText>
        <Gap />
        <Gap.large />
        <AppTextInput
          name="email"
          IconLeft={Icons.InputEmail}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeField={onChangeField}
          error={errors.email}
        />
        <Gap.Small />
        <AppTextInput
          name="password"
          IconLeft={Icons.InputPassword}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          onChangeField={onChangeField}
          error={errors.password}
        />
        <Gap />
        <AppButton text="Login" onPress={handleLogin} />
        <Gap />
        <AppTouchable onPress={handleForgotPassword}>
          <AppText color={colors.main} size={17}>
            Forgot your password ?
          </AppText>
        </AppTouchable>
      </ScrollView>
      <AppTouchable activeOpacity={0.8} onPress={handleSignUp}>
        <AppText style={styles.bottomText}>
          Don&apos;t have an account?{' '}
          <AppText color={colors.main}>Create new account</AppText>
        </AppText>
      </AppTouchable>
      <AppText style={styles.centerText}>v1.0.0</AppText>
    </ScreenContainer>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainSub1,
  },
  bottomText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  centerText: {
    textAlign: 'center',
  },
  loginSocial: {
    flexDirection: 'row',
  },
});
