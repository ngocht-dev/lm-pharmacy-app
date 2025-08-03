import { useCartStore } from '@/app/cartStore';
import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { RootScreenProps } from '@/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CartItem,
  CheckoutFooter,
  DiscountSection,
  EmptyCart,
} from '../components';

type CheckoutScreenProps = RootScreenProps<'CheckoutScreen'>;

const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity - 1);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log('Proceeding to checkout');
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <AppText size={18} color={colors.text} style={styles.headerTitle}>
          {t('checkout.my_cart')}
        </AppText>
        <View style={styles.headerRight} />
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
        {items.length > 0 ? (
          <>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}

            <DiscountSection />
          </>
        ) : (
          <EmptyCart />
        )}
      </ScrollView>

      {/* Checkout Footer */}
      {items.length > 0 && (
        <CheckoutFooter total={calculateTotal()} onCheckout={handleCheckout} />
      )}
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral0,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontWeight: '600',
  },
  headerRight: {
    width: 32,
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
