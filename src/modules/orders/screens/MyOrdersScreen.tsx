import AppText from '@/components/AppText';
import ScreenContainer from '@/components/ScreenContainer';
import colors from '@/constants/colors';
import { RootScreenProps } from '@/navigation/types';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList, Pressable } from 'react-native-gesture-handler';
import { OrderStatusChip } from '../components/OrderStatusChip';
import { useOrders } from '../hooks/useOrders';
import { OrderResponse, OrderStatus } from '../services/orders.services';

const EmptyOrder = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.emptyOrder}>
      <Feather name="shopping-bag" size={64} color="black" />
      <AppText size={18} color={colors.text} style={styles.emptyOrderTitle}>
        {t('orders.no_orders_yet')}
      </AppText>
      <AppText
        size={14}
        color={colors.neutral3}
        style={styles.emptyOrderSubtitle}
      >
        {t('orders.no_orders_subtitle')}
      </AppText>
    </View>
  );
};

const OrderItem = ({ orderDetail }: { orderDetail: OrderResponse }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<RootScreenProps<'MyOrdersScreen'>['navigation']>();

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => navigation.navigate('OrderDetailScreen', { orderDetail })}
    >
      <View style={styles.itemCodeContainer}>
        <Text
          style={styles.itemCodeText}
        >{`${t('orders.order_id')}: ${orderDetail.code}`}</Text>
      </View>
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemDetailText}>
          <Trans
            i18nKey={'orders.order_value'}
            values={{
              total: `${parseInt(`${orderDetail.total_value}`).toLocaleString()}₫`,
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
    </Pressable>
  );
};

const MyOrdersScreen = () => {
  const { t } = useTranslation();
  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOrders();

  const orders = useMemo(
    () => data?.pages.flatMap((item) => item.data),
    [data?.pages]
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    refetch();
  };

  const renderLoadingFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="large" color={colors.main} />
      </View>
    );
  };

  return (
    <ScreenContainer headerProp={{ title: t('orders.my_orders') }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem orderDetail={item} />}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        refreshing={false}
        onRefresh={onRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<EmptyOrder />}
        ListFooterComponent={renderLoadingFooter}
      />
    </ScreenContainer>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  listContainer: { flex: 1 },
  itemContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 8,
    marginVertical: 8,
    borderColor: colors.neutral2,
    paddingBottom: 8,
    backgroundColor: colors.neutral0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemCodeContainer: {
    borderColor: colors.main,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    backgroundColor: colors.main,
  },
  itemCodeText: { color: 'white', fontWeight: '600' },
  itemDetailContainer: { padding: 8 },
  itemDetailText: {
    marginVertical: 2,
  },
  itemDetailNumber: {
    fontWeight: 600,
  },

  emptyOrder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOrderTitle: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyOrderSubtitle: {
    textAlign: 'center',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
