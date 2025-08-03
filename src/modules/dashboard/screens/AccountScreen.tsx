import AppText from '@/components/AppText';
import AppTouchable from '@/components/AppTouchable';
import colors from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const AccountScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleNavigateToProfile = () => {
    navigation.navigate('ProfileScreen' as any);
  };

  return (
    <View style={styles.container}>
      <AppTouchable onPress={handleNavigateToProfile} style={styles.content}>
        <AppText size={24} color={colors.text} style={styles.title}>
          {t('profile.account')}
        </AppText>
        <AppText size={16} color={colors.neutral3} style={styles.subtitle}>
          {t('profile.account_info_placeholder')}
        </AppText>
      </AppTouchable>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
});
