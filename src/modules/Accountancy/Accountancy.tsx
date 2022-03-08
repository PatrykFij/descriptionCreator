import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import moment, { Moment } from 'moment';
import { dateAndTimeDisplayFormat } from 'utils/constants';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { mapOrdersWithBuyingPrice } from 'utils/mappers/mapOrdersWithPriceBuying';
import { Data, MappedOrder } from 'utils/mappers/types';
import { AppContext } from '../../context/AppContext/AppContext';
import OrdersTable from './components/OrdersTable.tsx';
import Summary from './components/Summary';

const Accountancy = () => {
  const {
    products,
    isLoadingProducts,
    getProducts,
    shippingMethods,
    isLoadingShippingMethods,
    getShippingMethods,
    orderedProducts,
    isLoadingOrderedProducts,
    getOrderedProductsFromToRange,
    orders,
    isLoadingOrders,
    getOrdersFromToRange,
  } = useContext(AppContext);

  const [mappedOrders, setMappedOrders] = useState<MappedOrder[]>();

  const [startDate, setStartDate] = useState<Moment>(moment().startOf('month'));
  const [endDate, setEndDate] = useState<Moment>(moment());

  const [maxOrderId, setMaxOrderId] = useState<number>(0);

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
    if (!products && !shippingMethods) {
      getProducts();
      getShippingMethods();
    }
  }, [getProducts, getShippingMethods, products, shippingMethods]);

  useEffect(() => {
    getOrdersFromToRange(startDate, endDate);
    getOrderedProductsFromToRange(startDate, endDate);
  }, [endDate, getOrderedProductsFromToRange, getOrdersFromToRange, startDate]);

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
  }, [orderedProducts, orders, products, shippingMethods]);

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
        {/* <Grid xs={6} item>
          <Stock products={products} />
        </Grid> */}
        <Grid xs={12} item>
          <Summary ordersByRange={ordersByRange} />
        </Grid>
        <Grid xs={12} item>
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
