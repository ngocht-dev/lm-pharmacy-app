import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { useUserInfo } from '@/modules/auth/hooks';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSignOut } from '../hooks';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconType: 'Ionicons' | 'MaterialCommunityIcons';
  onPress: () => void;
  isDestructive?: boolean;
}

const ProfileScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { signOut, isLoading } = useSignOut();
  const { data: userInfo } = useUserInfo();

  const handleMyOrders = () => {
    navigation.navigate('MyOrdersScreen');
  };

  const handleCategories = () => {
    // TODO: Navigate to categories screen
    console.log('Navigate to Categories');
  };

  const handleSocialAccount = () => {
    // TODO: Navigate to social account screen
    console.log('Navigate to Social Account');
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen
    console.log('Navigate to Change Password');
  };

  const handleTermsOfService = () => {
    // TODO: Navigate to terms of service screen
    console.log('Navigate to Terms of Service');
  };

  const handlePrivacyPolicy = () => {
    // TODO: Navigate to privacy policy screen
    console.log('Navigate to Privacy Policy');
  };

  const handleDeleteAccount = () => {
    // TODO: Show delete account confirmation
    console.log('Show Delete Account Confirmation');
  };

  const handleSignOut = () => {
    signOut();
  };

  const menuItems: MenuItem[] = [
    {
      id: 'orders',
      title: t('profile.my_orders'),
      icon: 'bag-outline',
      iconType: 'Ionicons',
      onPress: handleMyOrders,
    },
    {
      id: 'categories',
      title: t('profile.categories'),
      icon: 'pie-chart-outline',
      iconType: 'Ionicons',
      onPress: handleCategories,
    },
    {
      id: 'social',
      title: t('profile.social_account'),
      icon: 'link',
      iconType: 'Ionicons',
      onPress: handleSocialAccount,
    },
    {
      id: 'password',
      title: t('profile.change_password'),
      icon: 'lock-closed-outline',
      iconType: 'Ionicons',
      onPress: handleChangePassword,
    },
    {
      id: 'terms',
      title: t('profile.terms_of_service'),
      icon: 'document-text-outline',
      iconType: 'Ionicons',
      onPress: handleTermsOfService,
    },
    {
      id: 'privacy',
      title: t('profile.privacy_policy'),
      icon: 'document-text-outline',
      iconType: 'Ionicons',
      onPress: handlePrivacyPolicy,
    },
    {
      id: 'delete',
      title: t('profile.delete_account'),
      icon: 'trash-outline',
      iconType: 'Ionicons',
      onPress: handleDeleteAccount,
    },
    {
      id: 'signout',
      title: t('profile.log_out'),
      icon: 'log-out-outline',
      iconType: 'Ionicons',
      onPress: handleSignOut,
      isDestructive: true,
    },
  ];

  const renderIcon = (
    icon: string,
    iconType: string,
    isDestructive?: boolean
  ) => {
    const iconColor = isDestructive ? colors.error : colors.text;

    if (iconType === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={icon as any}
          size={24}
          color={iconColor}
        />
      );
    }
    return <Ionicons name={icon as any} size={24} color={iconColor} />;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <AppText size={18} color={colors.text} style={styles.headerTitle}>
          {t('profile.account')}
        </AppText>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.userInfoSection}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={40} color={colors.white} />
          </View>
          <View style={styles.userDetails}>
            <AppText size={18} color={colors.text} style={styles.username}>
              {userInfo?.username || 'Loading...'}
            </AppText>
            <AppText size={14} color={colors.neutral3} style={styles.userRole}>
              {userInfo?.role || 'Loading...'}
            </AppText>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem,
              ]}
              onPress={item.onPress}
              disabled={item.id === 'signout' && isLoading}
            >
              <View style={styles.menuItemLeft}>
                {renderIcon(item.icon, item.iconType, item.isDestructive)}
                <AppText
                  size={16}
                  color={item.isDestructive ? colors.error : colors.text}
                  style={styles.menuItemText}
                >
                  {item.title}
                </AppText>
              </View>
              {!item.isDestructive && (
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.neutral3}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral0,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  headerSpacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral0,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontWeight: '600',
  },
  userRole: {
    marginTop: 4,
  },
  userEmail: {
    marginTop: 2,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral0,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    marginLeft: 16,
    fontWeight: '500',
  },
});
