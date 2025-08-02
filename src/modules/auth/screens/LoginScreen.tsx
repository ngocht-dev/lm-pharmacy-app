import Icons from '@/assets/icons';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import AppTouchable from '@/components/AppTouchable';
import ErrorPopup from '@/components/ErrorPopup';
import Gap from '@/components/Gap';
import OverlaySpinner from '@/components/OverlaySpinner';
import ScreenContainer from '@/components/ScreenContainer';
import colors from '@/constants/colors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSignIn } from '../hooks';

const LoginScreen = () => {
  const { errors, message, setMessage, onChangeField, submit, isLoading } =
    useSignIn();
  const { t } = useTranslation();

  const handleLogin = () => {
    setMessage(''); // Clear any previous messages
    submit();
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
      {isLoading && <OverlaySpinner />}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Icons.Logo />
        </View>
        <Gap />
        <AppText color={colors.neutral3} size={20}>
          {t('common.welcome')}
        </AppText>
        <Gap />
        <Icons.LogoKolfund />
        <Gap />
        <AppTextInput
          name="email"
          IconLeft={Icons.InputEmail}
          placeholder={t('auth.email')}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeField={onChangeField}
          error={errors.email}
        />
        <Gap.Small />
        <AppTextInput
          name="password"
          IconLeft={Icons.InputPassword}
          placeholder={t('auth.password')}
          autoCapitalize="none"
          secureTextEntry
          onChangeField={onChangeField}
          error={errors.password}
        />
        <Gap />
        <AppButton
          text={isLoading ? t('common.logging_in') : t('auth.sign_in')}
          onPress={handleLogin}
          disabled={isLoading}
        />
        {message && (
          <AppText color={colors.error} size={14} style={styles.errorText}>
            {message}
          </AppText>
        )}
        <Gap />
        <AppTouchable onPress={handleForgotPassword}>
          <AppText color={colors.main} size={17}>
            {t('auth.forgot_password')}
          </AppText>
        </AppTouchable>
        <View style={styles.loginSocial}>
          {/* TODO: Add GoogleAuth and AppleOAuth components when ready */}
          <AppText color={colors.neutral3} size={14}>
            {t('common.social_login_coming_soon')}
          </AppText>
        </View>
      </ScrollView>
      <AppTouchable activeOpacity={0.8} onPress={handleSignUp}>
        <AppText style={styles.bottomText}>
          {t('auth.dont_have_account')}{' '}
          <AppText color={colors.main}>{t('auth.sign_up')}</AppText>
        </AppText>
      </AppTouchable>
      <AppText style={styles.centerText}>{t('common.version')}</AppText>
      <ErrorPopup
        show={Boolean(message)}
        message={message}
        onClose={() => setMessage('')}
      />
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
  errorText: {
    textAlign: 'center',
    marginTop: 8,
  },
});
