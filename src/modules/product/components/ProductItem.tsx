import { useCartStore } from '@/app/cartStore';
import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { safeText } from '@/utils/stringUtils';
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
  inCart: number;
}

interface ProductItemProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
}

const ProductItem = ({ product, onAddToCart }: ProductItemProps) => {
  const { addToCart, getItemQuantity } = useCartStore();

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
    inCart: getItemQuantity(safeText(product.id)),
  };

  const handleAddToCart = () => {
    addToCart({
      id: safeProduct.id,
      name: safeProduct.name,
      price: safeProduct.price,
      image: safeProduct.image,
    });

    if (onAddToCart) {
      onAddToCart(safeProduct.id);
    }
  };

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
        onPress={handleAddToCart}
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
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 200,
  },
  productImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: colors.neutral0,
  },
  weightTag: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: colors.main,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 16,
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
    gap: 4,
  },
  price: {
    fontWeight: '600',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: colors.mainSub1,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
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
