import { useCartStore } from '@/app/cartStore';
import Gap from '@/components/Gap';
import GlobalLoading from '@/components/GlobalLoading';
import colors from '@/constants/colors';
import ROUTES from '@/navigation/routes';
import { RootScreenProps } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CategoryGrid, HomeCarousel } from '../components';
import HomeHeader from '../components/HomeHeader';
import { useCategories } from '../hooks';
import { Category } from '../services/dashboard.services';

type HomeScreenNavigation = RootScreenProps<'ProductScreen'>['navigation'] &
  RootScreenProps<'OrdersScreen'>['navigation'] &
  RootScreenProps<'ProfileScreen'>['navigation'];

const HomeScreen = () => {
  const { data: categories, isLoading, error } = useCategories();
  const navigation = useNavigation<HomeScreenNavigation>();
  const { totalItems } = useCartStore();

  // Mock carousel images - using working placeholder service
  const carouselImages = [
    'https://dummyimage.com/400x200/7f58ad/ffffff&text=Enterogermina',
    'https://dummyimage.com/400x200/7f58ad/ffffff&text=Product+2',
    'https://dummyimage.com/400x200/7f58ad/ffffff&text=Product+3',
  ];

  const handleAccountPress = () => {
    navigation.navigate(ROUTES.PROFILE.MAIN);
  };

  const handleCartPress = () => {
    navigation.navigate(ROUTES.DASHBOARD.ORDERS);
  };

  const handleCategoryPress = (category: Category) => {
    console.log('Category pressed:', category.name);
    navigation.navigate(ROUTES.PRODUCTS.LIST, {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  if (isLoading) {
    return <GlobalLoading />;
  }

  if (error) {
    console.error('Error loading categories:', error);
  }

  return (
    <View style={styles.container}>
      <HomeHeader
        onAccountPress={handleAccountPress}
        onCartPress={handleCartPress}
        cartCount={totalItems}
      />
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Gap />
          <HomeCarousel images={carouselImages} />
          <Gap />
          <CategoryGrid
            categories={categories || []}
            onCategoryPress={handleCategoryPress}
          />
          <Gap />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral0,
  },
  contentContainer: {
    flex: 1,
  },
});
