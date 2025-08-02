import Icons from '@/assets/icons';
import AppText from '@/components/AppText';
import AppTouchable from '@/components/AppTouchable';
import colors from '@/constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchHeaderProps {
  onSearch: (text: string) => void;
  onAccountPress: () => void;
  onCartPress: () => void;
  cartCount?: number;
}

const HomeHeader = ({
  onSearch,
  onAccountPress,
  onCartPress,
  cartCount = 0,
}: SearchHeaderProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.headerRow}>
        <View style={styles.searchContainer}>
          <AppTouchable style={styles.searchBar} onPress={() => onSearch('')}>
            <Icons.Search />
            <AppText style={styles.searchText}>
              {t('dashboard.search_placeholder')}
            </AppText>
          </AppTouchable>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={onAccountPress}>
            <Ionicons name="person-circle-outline" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={32}
              color="white"
            />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <AppText size={8} color={colors.white}>
                  {cartCount}
                </AppText>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.main,
    paddingBottom: 15,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
  },
  searchContainer: {
    flex: 8,
  },
  searchBar: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchText: {
    marginLeft: 12,
    fontSize: 15,
    color: colors.neutral2,
  },
  iconsContainer: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'flex-end',
  },
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
