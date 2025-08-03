import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import {
  FilterButtons,
  FilterTabs,
  ProductHeader,
  ProductItem,
} from '../components';
import { useProducts } from '../hooks';

const ProductScreen = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState('');
  const [selectedTab, setSelectedTab] = useState('popular');

  const { data: products, isLoading, refetch } = useProducts();
  const { t } = useTranslation();

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

  // Transform API data to match ProductItem interface
  const transformedProducts =
    products?.map((product) => {
      const transformed = {
        id: product.id.toString(),
        name: product.name,
        image:
          product.thumbnail_url ||
          'https://dummyimage.com/150x150/90ee90/ffffff&text=Product',
        price: `${parseInt(product.sale_price).toLocaleString()}₫`,
        originalPrice:
          product.cost_price !== product.sale_price
            ? `${parseInt(product.cost_price).toLocaleString()}₫`
            : undefined,
        discount:
          product.cost_price !== product.sale_price
            ? `-${Math.round(
                ((parseInt(product.cost_price) - parseInt(product.sale_price)) /
                  parseInt(product.cost_price)) *
                  100
              )}%`
            : undefined,
        rating: 5, // Default rating since API doesn't provide it
        soldCount: `Đã bán ${product.sold_amount}`,
        weight: product.weight
          ? `${product.weight} ${product.weight_unit}`
          : undefined,
        ageRange: product.packaging || undefined,
        inCart: 0, // Default cart count
      };

      console.log('Transformed product:', transformed);
      return transformed;
    }) || [];

  const renderProductItem = ({ item }: { item: any }) => (
    <ProductItem product={item} onAddToCart={handleAddToCart} />
  );

  const renderHeader = () => (
    <>
      <FilterTabs selectedTab={selectedTab} onTabPress={handleTabPress} />
      <FilterButtons />
    </>
  );

  const renderLoadingFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  };

  const renderEmptyState = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyState}>
        <AppText
          size={16}
          color={colors.neutral3}
          style={styles.emptyStateText}
        >
          {t('product.no_products')}
        </AppText>
        <AppText
          size={14}
          color={colors.neutral3}
          style={styles.emptyStateSubtext}
        >
          {t('product.no_products_subtitle')}
        </AppText>
      </View>
    );
  };

  const onRefresh = () => {
    refetch();
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

      <FlatList
        data={transformedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderLoadingFooter}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        refreshing={isLoading}
        onRefresh={onRefresh}
      />
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
    paddingHorizontal: 8,
    flexGrow: 1,
  },
  productRow: {
    justifyContent: 'space-between',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    marginBottom: 8,
  },
  emptyStateSubtext: {
    marginTop: 4,
  },
});
