import Gap from '@/components/Gap';
import GlobalLoading from '@/components/GlobalLoading';
import colors from '@/constants/colors';
import { RootScreenProps } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CategoryGrid, HomeCarousel } from '../components';
import HomeHeader from '../components/HomeHeader';
import { useCategories } from '../hooks';
import { Category } from '../services/dashboard.services';

const HomeScreen = () => {
  const { data: categories, isLoading, error } = useCategories();
  const navigation =
    useNavigation<RootScreenProps<'ProductScreen'>['navigation']>();
  const [cartCount] = useState(3); // Mock cart count

  // Mock carousel images - using working placeholder service
  const carouselImages = [
    'https://dummyimage.com/400x200/7f58ad/ffffff&text=Enterogermina',
    'https://dummyimage.com/400x200/7f58ad/ffffff&text=Product+2',
    'https://dummyimage.com/400x200/7f58ad/ffffff&text=Product+3',
  ];

  const handleAccountPress = () => {
    console.log('Account pressed');
  };

  const handleCartPress = () => {
    console.log('Cart pressed');
  };

  const handleCategoryPress = (category: Category) => {
    console.log('Category pressed:', category.name);
    navigation.navigate('ProductScreen', {
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
        cartCount={cartCount}
      />
      <View style={{ flex: 1 }}>
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
});
