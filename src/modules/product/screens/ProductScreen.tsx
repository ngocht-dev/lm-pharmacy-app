import colors from '@/constants/colors';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FilterButtons,
  FilterTabs,
  ProductHeader,
  ProductItem,
} from '../components';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: number;
  soldCount: string;
  weight?: string;
  ageRange?: string;
  inCart?: number;
}

const ProductScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('popular');

  // Mock product data based on screenshot
  const products: Product[] = [
    {
      id: '1',
      name: 'Sữa chua Vinamilk Love Yogurt Green Farm Ít',
      image: 'https://dummyimage.com/150x150/90ee90/ffffff&text=Vinamilk',
      price: '28.000₫',
      rating: 5,
      soldCount: 'Đã bán 20K+',
    },
    {
      id: '2',
      name: 'Sữa dê Hikid 650g (1-9 tuổi)',
      image: 'https://dummyimage.com/150x150/ffd700/ffffff&text=Hikid',
      price: '650.000₫',
      rating: 5,
      soldCount: 'Đã bán 50K+',
      weight: '650 gr',
      ageRange: '1-9 tuổi',
      inCart: 1,
    },
    {
      id: '3',
      name: 'Sữa NAN SUPREME PRO số 3 800g (2-6 tuổi)',
      image: 'https://dummyimage.com/150x150/ffd700/ffffff&text=NAN+3',
      price: '538.200₫',
      originalPrice: '585.000₫',
      discount: '-8%',
      rating: 5,
      soldCount: 'Đã bán 100K+',
      weight: '800 gr',
      ageRange: '2-6 tuổi',
    },
    {
      id: '4',
      name: 'Sữa NAN SUPREME PRO số 2 800g (12-24 tháng)',
      image: 'https://dummyimage.com/150x150/ffd700/ffffff&text=NAN+2',
      price: '655.000₫',
      rating: 5,
      soldCount: 'Đã bán 50',
      weight: '800 g',
      ageRange: '1-2 tuổi',
      inCart: 3,
    },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    console.log('Searching for:', text);
    // TODO: Implement search logic
  };

  const handleCartPress = () => {
    // TODO: Navigate to checkout
    console.log('Navigate to checkout');
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Add to cart logic
    console.log('Add to cart:', productId);
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    console.log('Selected tab:', tab);
    // TODO: Implement filter logic
  };

  return (
    <View style={[styles.container]}>
      <ProductHeader
        searchText={searchText}
        onSearchChange={handleSearch}
        onBackPress={handleBack}
        onCartPress={handleCartPress}
        cartCount={7}
      />

      <FilterTabs selectedTab={selectedTab} onTabPress={handleTabPress} />

      <FilterButtons />

      <ScrollView
        style={styles.productList}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productGrid}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  productList: {
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
});
