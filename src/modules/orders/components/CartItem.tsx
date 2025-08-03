import { CartItem as CartItemType } from '@/app/cartStore';
import AppText from '@/components/AppText';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface CartItemProps {
  item: CartItemType;
  onIncreaseQuantity: (itemId: string, currentQuantity: number) => void;
  onDecreaseQuantity: (itemId: string, currentQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const CartItem = ({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CartItemProps) => {
  const { t } = useTranslation();

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      t('checkout.remove_item_title'),
      t('checkout.remove_item_message'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.remove'),
          style: 'destructive',
          onPress: () => onRemoveItem(itemId),
        },
      ]
    );
  };

  const handleDecreaseQuantity = (itemId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      onDecreaseQuantity(itemId, currentQuantity);
    } else {
      handleRemoveItem(itemId);
    }
  };

  const renderRightActions = (itemId: string) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleRemoveItem(itemId)}
    >
      <Ionicons name="trash-outline" size={24} color={colors.white} />
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      rightThreshold={40}
    >
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        <View style={styles.productInfo}>
          <AppText
            size={14}
            color={colors.text}
            style={styles.productName}
            numberOfLines={2}
          >
            {item.name}
          </AppText>
          <AppText size={16} color={colors.error} style={styles.productPrice}>
            {item.price}
          </AppText>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleDecreaseQuantity(item.id, item.quantity)}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </TouchableOpacity>

          <AppText size={16} color={colors.text} style={styles.quantityText}>
            {item.quantity}
          </AppText>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onIncreaseQuantity(item.id, item.quantity)}
          >
            <Ionicons name="add" size={16} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.neutral0,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontWeight: '500',
    marginBottom: 4,
  },
  productPrice: {
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral0,
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quantityText: {
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
