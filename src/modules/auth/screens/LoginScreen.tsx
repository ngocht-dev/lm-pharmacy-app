import Icons from '@/assets/icons';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import ErrorPopup from '@/components/ErrorPopup';
import Gap from '@/components/Gap';
import OverlaySpinner from '@/components/OverlaySpinner';
import ScreenContainer from '@/components/ScreenContainer';
import colors from '@/constants/colors';
import { getAppVersion } from '@/utils/common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { useSignIn } from '../hooks';

const LoginScreen = () => {
  const { errors, message, setMessage, onChangeField, submit, isLoading } =
    useSignIn();
  const { t } = useTranslation();

  const handleLogin = () => {
    setMessage('');
    submit();
  };

  return (
    <ScreenContainer hideHeader={true}>
      {isLoading && <OverlaySpinner />}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Gap />
        <AppText color={colors.neutral3} size={20}>
          {t('common.welcome')}
        </AppText>
        <Gap />
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="cover"
        />
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
          text={t('auth.sign_in')}
          onPress={handleLogin}
          disabled={isLoading}
        />
        {message && (
          <AppText color={colors.error} size={14} style={styles.errorText}>
            {message}
          </AppText>
        )}
        <Gap />
      </ScrollView>
      <AppText style={styles.centerText}>{getAppVersion()}</AppText>
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
  centerText: {
    textAlign: 'center',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 8,
  },
  logoImage: {
    width: 200,
    height: 100,
  },
});
