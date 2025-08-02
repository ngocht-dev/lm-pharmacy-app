import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import colors from '@/constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SearchHeaderProps {
  onSearch: (text: string) => void;
  onAccountPress: () => void;
  onCartPress: () => void;
  cartCount?: number;
}

const SearchHeader = ({
  onSearch,
  onAccountPress,
  onCartPress,
  cartCount = 0,
}: SearchHeaderProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#667eea" />
        <AppTextInput
          name="search"
          placeholder={t('dashboard.search_placeholder')}
          onChangeField={onSearch}
          style={styles.searchInput}
        />
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={onAccountPress}>
        <Ionicons name="person-circle-outline" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
        <MaterialCommunityIcons name="cart-outline" size={32} color="white" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <AppText size={8} color={colors.white}>
              {cartCount}
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
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
