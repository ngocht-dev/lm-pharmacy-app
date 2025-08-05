import { useCartStore } from '@/app/cartStore';
import { Divider } from '@/components/Divider';
import ScreenContainer from '@/components/ScreenContainer';
import colors from '@/constants/colors';
import { RootScreenProps } from '@/navigation/types';
import { formatMoney } from '@/utils/helper';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import OrderDetailFooter from '../components/OrderDetailFooter';
import { OrderStatusChip } from '../components/OrderStatusChip';
import { ProductList } from '../components/ProductList';
import { useOrderDetail } from '../hooks/useOrderDetail';
import { OrderResponse, OrderStatus } from '../services/orders.services';

const OrderDetailScreen = ({
  route,
  navigation,
}: RootScreenProps<'OrderDetailScreen'>) => {
  const { orderDetail: orderDetailParams } = route.params;
  const { t } = useTranslation();
  const { addToCart, getItemQuantity, updateQuantity } = useCartStore();
  const { data } = useOrderDetail(orderDetailParams.id);

  const orderDetail = useMemo(
    () => data ?? orderDetailParams,
    [data, orderDetailParams]
  );

  const onReorder = () => {
    for (const item of orderDetail.items) {
      const existedQuantity = getItemQuantity(item.product.id);

      if (!existedQuantity) {
        addToCart({
          id: item.product.id,
          name: item.product.name,
          price: item.product.sale_price,
          image: item.product.photo_urls?.[0] ?? '',
          quantity: item.quantity,
        });
      }
      if (existedQuantity < item.quantity) {
        updateQuantity(item.product.id, item.quantity);
      }
    }
    navigation.navigate('OrdersScreen');
  };

  return (
    <ScreenContainer
      headerProp={{ title: t('order_detail.title') }}
      containerStyle={styles.screenContainer}
      style={styles.screen}
    >
      <ScrollView style={styles.scrollContainer}>
        <Overview orderDetail={orderDetail} />
        <ProductList orderDetail={orderDetail} />
        <Summary orderDetail={orderDetail} />
      </ScrollView>
      <OrderDetailFooter
        saleMethod={orderDetail.sale_method}
        onReorder={onReorder}
      />
    </ScreenContainer>
  );
};

const Overview = ({ orderDetail }: { orderDetail: OrderResponse }) => {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.overviewCodeContainer}>
        <Text
          style={styles.itemCodeText}
        >{`${t('orders.order_id')}: ${orderDetail.code}`}</Text>
      </View>
      <View style={styles.overviewDetailContainer}>
        <Text style={styles.itemDetailText}>
          <Trans
            i18nKey={'orders.order_value'}
            values={{
              total: formatMoney(orderDetail.total_value),
            }}
            components={[<Text style={styles.itemDetailNumber} key={'1'} />]}
          />
        </Text>
        <Text style={styles.itemDetailText}>
          <Trans
            i18nKey={'orders.total_products'}
            values={{ total: orderDetail.total_products }}
            components={[<Text style={styles.itemDetailNumber} key={'1'} />]}
          />
        </Text>
        {orderDetail.order_status && (
          <View style={styles.statusContainer}>
            <Text style={styles.itemDetailText}>
              {t('orders.order_status')}
            </Text>
            <OrderStatusChip status={orderDetail.order_status as OrderStatus} />
          </View>
        )}
      </View>
    </View>
  );
};

const Summary = ({ orderDetail }: { orderDetail: OrderResponse }) => {
  const { t } = useTranslation();

  const estimatedPrice = useMemo(
    () =>
      orderDetail.items.reduce(
        (prev, current) => prev + current.total_price,
        0
      ),
    [orderDetail.items]
  );
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryItem}>
        <Text> {t('order_detail.estimated_price')}</Text>
        <Text>{formatMoney(estimatedPrice)}</Text>
      </View>
      <Divider />
      <View style={styles.summaryItem}>
        <Text> {t('order_detail.fee')}</Text>
        <Text>{formatMoney(orderDetail.extra_fee)}</Text>
      </View>
      <Divider />
      <View style={styles.summaryItem}>
        <Text> {t('order_detail.discount')}</Text>
        <Text>{formatMoney(orderDetail.discount)}</Text>
      </View>
      <Divider />
      <View style={styles.summaryItem}>
        <Text> {t('order_detail.total_price')}</Text>
        <Text>{formatMoney(orderDetail.total_value)}</Text>
      </View>
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 0,
  },
  screen: { backgroundColor: 'white' },
  scrollContainer: { backgroundColor: colors.neutral1 },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  overviewCodeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.main,
  },
  itemCodeText: { color: 'white', fontWeight: '600' },
  overviewDetailContainer: {
    padding: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.neutral1,
    backgroundColor: colors.neutral0,
  },
  itemDetailText: {
    marginVertical: 2,
  },
  itemDetailNumber: {
    fontWeight: 600,
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: colors.neutral1,
    padding: 8,
    backgroundColor: colors.neutral0,
  },
  summaryItem: {
    marginVertical: 0,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
