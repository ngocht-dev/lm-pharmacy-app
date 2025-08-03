import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

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

interface ProductItemProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductItem = ({ product, onAddToCart }: ProductItemProps) => {
  // Ensure all text values are strings with better error handling
  const safeText = (value: any): string => {
    try {
      if (value === null || value === undefined) return '';
      if (typeof value === 'string') return value;
      if (typeof value === 'number') return value.toString();
      if (typeof value === 'boolean') return value.toString();
      return String(value);
    } catch (error) {
      console.warn('Error converting value to string:', value, error);
      return '';
    }
  };

  // Additional safety check for product
  if (!product) {
    console.warn('ProductItem: No product provided');
    return null;
  }

  // Pre-convert all text values to ensure they're strings
  const safeProduct = {
    id: safeText(product.id),
    name: safeText(product.name),
    image: safeText(product.image),
    price: safeText(product.price),
    originalPrice: product.originalPrice
      ? safeText(product.originalPrice)
      : undefined,
    discount: product.discount ? safeText(product.discount) : undefined,
    rating: product.rating || 0,
    soldCount: safeText(product.soldCount),
    weight: product.weight ? safeText(product.weight) : undefined,
    ageRange: product.ageRange ? safeText(product.ageRange) : undefined,
    inCart: product.inCart || 0,
  };

  // Debug log to see what data we're getting
  console.log('ProductItem render:', {
    id: safeProduct.id,
    name: safeProduct.name,
    price: safeProduct.price,
    soldCount: safeProduct.soldCount,
    inCart: safeProduct.inCart,
  });

  return (
    <View style={styles.productItem}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: safeProduct.image }}
          style={styles.productImage}
        />
        {safeProduct.weight && (
          <View style={styles.weightTag}>
            <AppText size={10} color={colors.white}>
              {safeProduct.weight}
            </AppText>
            {safeProduct.ageRange && (
              <AppText size={10} color={colors.white}>
                {safeProduct.ageRange}
              </AppText>
            )}
          </View>
        )}
        {safeProduct.discount && (
          <View style={styles.discountTag}>
            <AppText size={10} color={colors.white}>
              {safeProduct.discount}
            </AppText>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <AppText
          size={12}
          color={colors.text}
          style={styles.productName}
          numberOfLines={3}
        >
          {safeProduct.name}
        </AppText>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Ionicons key={index} name="star" size={12} color="#FFD700" />
          ))}
        </View>

        <AppText size={10} color={colors.neutral3} style={styles.soldCount}>
          {safeProduct.soldCount}
        </AppText>

        <View style={styles.priceContainer}>
          <AppText size={14} color={colors.error} style={styles.price}>
            {safeProduct.price}
          </AppText>
          {safeProduct.originalPrice && (
            <AppText
              size={12}
              color={colors.neutral3}
              style={styles.originalPrice}
            >
              {safeProduct.originalPrice}
            </AppText>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => onAddToCart(safeProduct.id)}
      >
        <MaterialCommunityIcons
          name="cart-outline"
          size={20}
          color={colors.main}
        />
        {safeProduct.inCart > 0 && (
          <View style={styles.cartBadge}>
            <AppText size={8} color={colors.white}>
              {String(safeProduct.inCart)}
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productItem: {
    width: '50%',
    padding: 8,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  weightTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    marginBottom: 4,
    lineHeight: 16,
    minHeight: 48,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  soldCount: {
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontWeight: '600',
    marginRight: 4,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
