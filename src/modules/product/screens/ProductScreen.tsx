import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { RootScreenProps } from '@/navigation/types';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { ProductHeader, ProductItem } from '../components';
import { useProducts } from '../hooks';

type ProductScreenProps = RootScreenProps<'ProductScreen'>;

const ProductScreen = ({ navigation, route }: ProductScreenProps) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  // Get category_id from route params
  const categoryId = route.params?.categoryId;
  const categoryName = route.params?.categoryName;

  const {
    data: productsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useProducts({
    name: debouncedSearchText || undefined,
    category_id: categoryId,
    enabled: true,
  });

  const { t } = useTranslation();

  // Debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchText]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    console.log('Searching for:', text);
  };

  // Flatten all pages data
  const allProducts = productsData?.pages?.flatMap((page) => page.data) || [];

  // Transform API data to match ProductItem interface
  const transformedProducts = allProducts.map((product) => {
    const transformed = {
      id: product.id.toString(),
      name: product.name,
      image:
        product.thumbnail_url ||
        'https://dummyimage.com/150x150/90ee90/ffffff&text=Product',
      price: `${parseInt(product.sale_price).toLocaleString()}₫`,
      originalPrice:
        product.cost_price !== product.sale_price &&
        parseInt(product.cost_price) > parseInt(product.sale_price)
          ? `${parseInt(product.cost_price).toLocaleString()}₫`
          : undefined,
      rating: 5, // Default rating since API doesn't provide it
      soldCount: `Đã bán ${product.sold_amount}`,
      weight: product.weight
        ? `${product.weight} ${product.weight_unit}`
        : undefined,
      ageRange: product.packaging || undefined,
      inCart: 0, // This will be updated by the cart store
    };

    return transformed;
  });

  const renderProductItem = ({ item }: { item: any }) => (
    <View style={styles.productItemWrapper}>
      <ProductItem product={item} />
    </View>
  );

  const renderLoadingFooter = () => {
    if (!isFetchingNextPage) return null;
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
          {debouncedSearchText
            ? `${t('product.no_search_results_prefix')} "${debouncedSearchText}"`
            : categoryId
              ? `${t('product.no_products_in_category')} "${categoryName}"`
              : t('product.no_products')}
        </AppText>
        <AppText
          size={14}
          color={colors.neutral3}
          style={styles.emptyStateSubtext}
        >
          {debouncedSearchText
            ? t('product.try_different_search')
            : categoryId
              ? t('product.try_different_category')
              : t('product.no_products_subtitle')}
        </AppText>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    refetch();
  };

  // Show centered loading screen when initially loading
  if (isLoading && !productsData) {
    return (
      <View style={styles.container}>
        <ProductHeader
          searchText={searchText}
          onSearchChange={handleSearch}
          onBackPress={handleBack}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.main} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <ProductHeader
        searchText={searchText}
        onSearchChange={handleSearch}
        onBackPress={handleBack}
      />

      <FlatList
        data={transformedProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={renderLoadingFooter}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        refreshing={false}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
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
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  productItemWrapper: {
    width: '48%', // Fixed width to ensure 2 columns
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Distribute items evenly
  },
});
