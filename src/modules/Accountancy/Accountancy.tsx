import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import moment, { Moment } from 'moment';
import { Product } from 'types/Product';
import Card from 'components/Card';
import { dateAndTimeDisplayFormat } from 'utils/constants';
import { handleException } from 'utils/handleException';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { mapOrdersWithBuyingPrice } from 'utils/mappers/mapOrdersWithPriceBuying';
import { Data, MappedOrder } from 'utils/mappers/types';
import * as api from '../../api/api';
import OrdersTable from './components/OrdersTable.tsx';
import Stock from './components/Stock';
import Summary from './components/Summary';
import * as S from './styles';

const Accountancy = () => {
  const [orders, setOrders] = useState<MappedOrder[]>();
  const [dateRange, setDateRange] = useState<Moment[]>([
    moment().startOf('month'),
    moment(),
  ]);
  const [maxOrderId, setMaxOrderId] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>(
    JSON.parse(localStorage.getItem('data') || '{}')?.allProducts,
  );

  const { isLoadingShippingMethods, getShippingMethods } =
    api.useGetShippingMethod();
  const { isLoadingProducts, getProducts } = api.useGetProducts();
  const { isLoadingOrders, getOrders } = api.useGetOrders();
  const { isLoadingOrderedProducts, getOrderedProducts } =
    api.useGetOrderedProducts();

  const handleMapData = useCallback(() => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      const mappedData = mapOrdersWithBuyingPrice(data);
      const orderRange = mapOrdersRange(mappedData);
      setMaxOrderId(orderRange[1]);
      setOrders(mappedData);
    }
  }, []);

  useEffect(() => {
    handleMapData();
  }, [handleMapData]);

  const handleDownloadData = useCallback(async () => {
    try {
      const shippingMethods = await getShippingMethods();
      const allProducts = await getProducts();
      const allOrders = await getOrders();
      const allOrderedProducts = await getOrderedProducts();

      if (allProducts && allOrders && allOrderedProducts && shippingMethods) {
        const data: Data = {
          shippingMethods: shippingMethods.data,
          allProducts: allProducts.data,
          allOrders: allOrders.data,
          allOrderedProducts: allOrderedProducts.data,
          lastUpdate: moment().format(dateAndTimeDisplayFormat),
        };
        const mappedData = mapOrdersWithBuyingPrice(data);
        const orderRange = mapOrdersRange(mappedData);
        setMaxOrderId(orderRange[1]);
        setOrders(mappedData);
        setProducts(allProducts.data);
      }
    } catch (e: any) {
      console.log('error', e);
      handleException(e);
    }
  }, [getOrderedProducts, getOrders, getProducts, getShippingMethods]);

  const isLoading = useMemo(
    () =>
      isLoadingProducts ||
      isLoadingOrders ||
      isLoadingOrderedProducts ||
      isLoadingShippingMethods,
    [
      isLoadingOrderedProducts,
      isLoadingOrders,
      isLoadingProducts,
      isLoadingShippingMethods,
    ],
  );

  const ordersByRange = useMemo(() => {
    if (orders) {
      return orders.filter(
        (el) =>
          moment(el.date) >= dateRange[0] && moment(el.date) <= dateRange[1],
      );
    }
  }, [orders, dateRange]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <S.Summary item>
          <Card title="Stan magazynowy">
            <Stock products={products} />
          </Card>
        </S.Summary>
        <S.Summary item>
          <Summary ordersByRange={ordersByRange} />
        </S.Summary>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OrdersTable
            ordersByRange={ordersByRange}
            isLoading={isLoading}
            orders={orders}
            dateRange={dateRange}
            setDateRange={setDateRange}
            handleGetData={handleDownloadData}
            maxOrderId={maxOrderId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accountancy;
