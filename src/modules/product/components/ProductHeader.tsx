import Icons from '@/assets/icons';
import AppText from '@/components/AppText';
import AppTextInput from '@/components/AppTextInput';
import colors from '@/constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface ProductHeaderProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  onBackPress: () => void;
  onCartPress: () => void;
  cartCount?: number;
}

const ProductHeader = ({
  searchText,
  onSearchChange,
  onBackPress,
  onCartPress,
  cartCount = 0,
}: ProductHeaderProps) => {
  const handleSearchChange = (fieldName: string, text: string) => {
    onSearchChange(text);
  };

  return (
    <LinearGradient
      colors={['#4A90E2', '#7B68EE']}
      style={styles.headerGradient}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <AppTextInput
            name="search"
            placeholder="Tìm kiếm sản phẩm"
            value={searchText}
            onChangeField={handleSearchChange}
            style={styles.searchInput}
            IconLeft={Icons.Search}
          />
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
          <MaterialCommunityIcons name="cart-outline" size={24} color="white" />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <AppText size={8} color={colors.white}>
                {cartCount}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartButton: {
    padding: 4,
    position: 'relative',
    marginLeft: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
