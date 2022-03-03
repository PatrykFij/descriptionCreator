import { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import moment, { Moment } from 'moment';
import Card from 'components/Card';
import { dateAndTimeDisplayFormat } from 'utils/constants';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { mapOrdersWithBuyingPrice } from 'utils/mappers/mapOrdersWithPriceBuying';
import { Data, MappedOrder } from 'utils/mappers/types';
import * as api from '../../api/api';
import OrdersTable from './components/OrdersTable.tsx';
import Stock from './components/Stock';
import Summary from './components/Summary';
import * as S from './styles';

const Accountancy = () => {
  const [mappedOrders, setMappedOrders] = useState<MappedOrder[]>();

  const [startDate, setStartDate] = useState<Moment>(moment().startOf('month'));
  const [endDate, setEndDate] = useState<Moment>(moment());

  const [maxOrderId, setMaxOrderId] = useState<number>(0);

  const { shippingMethods, isLoadingShippingMethods, getShippingMethods } =
    api.useGetShippingMethod();

  const { products, isLoadingProducts, getProducts } = api.useGetProducts();
  const { orders, isLoadingOrders, getOrders } = api.useGetOrders(
    startDate,
    endDate,
  );
  const { orderedProducts, isLoadingOrderedProducts, getOrderedProducts } =
    api.useGetOrderedProducts();

  const handleMapData = useCallback(() => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      const mappedData = mapOrdersWithBuyingPrice(data);
      const orderRange = mapOrdersRange(mappedData);
      setMaxOrderId(orderRange[1]);
      setMappedOrders(mappedData);
    }
  }, []);

  useEffect(() => {
    getShippingMethods();
    getProducts();
    getOrderedProducts();
  }, [getOrderedProducts, getProducts, getShippingMethods]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  useEffect(() => {
    handleMapData();
  }, [handleMapData]);

  useEffect(() => {
    if (shippingMethods && products && orders && orderedProducts) {
      const data: Data = {
        shippingMethods,
        products,
        orders,
        orderedProducts,
        lastUpdate: moment().format(dateAndTimeDisplayFormat),
      };
      const mappedData = mapOrdersWithBuyingPrice(data);
      const orderRange = mapOrdersRange(mappedData);
      setMaxOrderId(orderRange[1]);
      setMappedOrders(mappedData);
    }
  }, [getOrders, orderedProducts, orders, products, shippingMethods]);

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
    if (mappedOrders) {
      return mappedOrders.filter(
        (el) =>
          moment(el.date).isSameOrAfter(startDate) &&
          moment(el.date).isSameOrBefore(endDate),
      );
    }
  }, [mappedOrders, startDate, endDate]);

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
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            maxOrderId={maxOrderId}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accountancy;
