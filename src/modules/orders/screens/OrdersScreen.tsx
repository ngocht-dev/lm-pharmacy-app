import { useCartStore } from '@/app/cartStore';
import { showErrorMessage } from '@/components/ToastContainer';
import colors from '@/constants/colors';
import { useUserInfo } from '@/modules/auth/hooks';
import { RootScreenProps } from '@/navigation/types';
import useGlobalLoading from '@/store/useGlobalLoading';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CartItem,
  CheckoutFooter,
  ConfirmOrderModal,
  DiscountSection,
  EmptyCart,
  OrdersHeader,
  SuccessModal,
} from '../components';
import { useCreateOrder } from '../hooks';
import { CreateOrderRequest, SaleMethod } from '../services/orders.services';

type CheckoutScreenProps = RootScreenProps<'OrdersScreen'>;

const OrdersScreen = ({ navigation }: CheckoutScreenProps) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { mutateAsync: createOrder, isPending } = useCreateOrder();
  const { data: userInfo } = useUserInfo();
  const { setLoading } = useGlobalLoading();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleIncreaseQuantity = (itemId: string, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Error', 'Cart is empty');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      setShowConfirmModal(false);
      const orderItems = items.map((item) => ({
        product_id: parseInt(item.id),
        quantity: item.quantity,
      }));

      const orderData: CreateOrderRequest = {
        items: orderItems,
        customer: userInfo?.id || 1,
        customer_type: 'INDIVIDUAL',
        sale_method: SaleMethod.DIRECT,
      };

      const result = await createOrder(orderData);

      if (result) {
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      showErrorMessage(t('checkout.order_creation_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = () => {
    setShowConfirmModal(false);
  };

  const handleViewOrders = () => {
    clearCart();
    setShowSuccessModal(false);
    navigation.navigate('MyOrdersScreen');
  };

  const handleContinueShopping = () => {
    clearCart();
    setShowSuccessModal(false);
    navigation.replace('Dashboard', { screen: 'HomeScreen' });
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <OrdersHeader onBackPress={handleBack} title={t('checkout.my_cart')} />

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

      {items.length > 0 && (
        <CheckoutFooter total={calculateTotal()} onCheckout={handleCheckout} />
      )}

      <ConfirmOrderModal
        visible={showConfirmModal}
        total={calculateTotal()}
        isPending={isPending}
        onConfirm={handleConfirmOrder}
        onCancel={handleCancelOrder}
      />

      <SuccessModal
        visible={showSuccessModal}
        onViewOrders={handleViewOrders}
        onContinueShopping={handleContinueShopping}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
