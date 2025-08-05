import AppText from '@/components/AppText';
import { Divider } from '@/components/Divider';
import colors from '@/constants/colors';
import { formatMoney } from '@/utils/helper';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { OrderItemResponse, OrderResponse } from '../services/orders.services';

export const ProductList = ({
  orderDetail,
}: {
  orderDetail: OrderResponse;
}) => {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: OrderItemResponse }) => {
    return (
      <View style={styles.productItem}>
        <Image
          source={{ uri: item.product.photo_urls?.[0] }}
          style={styles.productImage}
        />

        <View style={styles.productInfo}>
          <AppText
            size={14}
            color={colors.text}
            style={styles.productName}
            numberOfLines={2}
          >
            {item.product.name}
          </AppText>
          <AppText size={16} color={colors.error} style={styles.productPrice}>
            {formatMoney(item.unit_price)}
          </AppText>
        </View>

        <AppText size={16} color={colors.text}>
          {`x${item.quantity}`}
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('order_detail.product')}</Text>
      <Divider />
      <View style={styles.productListContainer}>
        {orderDetail.items?.map((item) => renderItem({ item }))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    marginVertical: 2,
  },
  title: {
    marginBottom: 3,
    fontWeight: 600,
    fontSize: 16,
    color: colors.neutral6,
  },

  productListContainer: {
    marginTop: 8,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
});
