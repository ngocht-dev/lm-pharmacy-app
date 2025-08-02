import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Category } from '../services/dashboard.services';

const { width } = Dimensions.get('window');

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (category: Category) => void;
}

const CategoryGrid = ({ categories, onCategoryPress }: CategoryGridProps) => {
  const { t } = useTranslation();

  // Mock category icons - matching the screenshot
  const categoryIcons = [
    'bag-outline', // HMP - Listerine
    'star-outline', // HMP - lactacyd
    'color-palette-outline', // HMP - Vaseline Unilever
    'nutrition-outline', // HMP - Green cross
    'fast-food-outline', // Dầu - Khác
    'people-outline', // HMP - Việt Hương
    'person-outline', // Khác
    'star-outline', // Kẹo Cốm - Ngoại
    'medical-outline', // Kẹo Singum
    'medical-outline', // Kẹo Cốm - Nội
    'medical-outline', // Dầu - Agimexpharm
    'medical-outline', // Dầu Sing - Eagle Brand
    'medical-outline', // DCYT - Tanaphar
    'medical-outline', // DCYT - Dophaco
    'medical-outline', // Kẹo - Bibica
    'medical-outline', // Kẹo Cốm - LMCpharco
    'medical-outline', // Dầu - Trường Sơn
    'medical-outline', // Thanh Lý
    'medical-outline', // Kẹo - Hàn Quốc
  ];

  const renderCategoryItem = (category: Category, index: number) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryItem}
      onPress={() => onCategoryPress(category)}
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons
          name={categoryIcons[index] as any}
          size={32}
          color={colors.main}
        />
      </View>
      <AppText
        size={12}
        color={colors.text}
        style={styles.categoryText}
        numberOfLines={2}
      >
        {category.name}
      </AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoriesContainer}>
      <AppText size={18} color={colors.text} style={styles.sectionTitle}>
        {t('dashboard.product_categories')}
      </AppText>
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) =>
          renderCategoryItem(category, index)
        )}
      </View>
    </View>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  categoriesContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 16,
    fontSize: 18,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryItem: {
    width: (width - 48) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.mainSub1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
  },
});
