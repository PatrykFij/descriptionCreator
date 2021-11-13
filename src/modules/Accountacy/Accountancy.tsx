import { useEffect, useMemo, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Card from 'components/Card';
import { handleException } from 'utils/handleException';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { mapOrdersWithBuyingPrice } from 'utils/mappers/mapOrdersWithPriceBuying';
import { Data, MappedOrder } from 'utils/mappers/types';
import OrdersTable from './components/OrdersTable.tsx';
import Summary from './components/Summary';
import * as api from './api';
import * as S from './styles';

const Accountancy = () => {
  const [orders, setOrders] = useState<MappedOrder[]>();
  const [ordersRange, setOrdersRange] = useState<number[]>();

  const { isLoadingShippings, getShippingMethods } = api.useGetShippingMethod();
  const { isLoading: isLoadingProducts, getAllProducts } = api.useGetProducts();
  const { isLoading: isLoadingOrders, getAllOrders } = api.useGetOrders();
  const { isLoading: isLoadingOrderedProducts, getAllOrderedProducts } =
    api.useGetOrderedProducts();

  useEffect(() => {
    handleMapData();
  }, []);

  const handleMapData = () => {
    const localStorageData = localStorage.getItem('data');
    if (localStorageData) {
      const data = JSON.parse(localStorageData);
      const mappedData = mapOrdersWithBuyingPrice(data);
      const orderRange = mapOrdersRange(mappedData);
      setOrders(mappedData);
      setOrdersRange(orderRange);
    }
  };

  const handleDownloadData = async () => {
    try {
      const shippingMethods = await getShippingMethods();
      const allProducts = await getAllProducts();
      const allOrders = await getAllOrders();
      const allOrderedProducts = await getAllOrderedProducts();

      if (allProducts && allOrders && allOrderedProducts && shippingMethods) {
        const data: Data = {
          shippingMethods: shippingMethods,
          allProducts: allProducts,
          allOrders: allOrders,
          allOrderedProducts: allOrderedProducts,
        };
        localStorage.setItem('data', JSON.stringify(data));
        const mappedData = mapOrdersWithBuyingPrice(data);
        const orderRange = mapOrdersRange(mappedData);
        setOrders(mappedData);
        setOrdersRange(orderRange);
      }
    } catch (e: any) {
      handleException(e);
    }
  };

  const isLoading = useMemo(
    () =>
      isLoadingProducts ||
      isLoadingOrders ||
      isLoadingOrderedProducts ||
      isLoadingShippings,
    [
      isLoadingOrderedProducts,
      isLoadingOrders,
      isLoadingProducts,
      isLoadingShippings,
    ],
  );

  const ordersByRange = useMemo(() => {
    if (orders && ordersRange) {
      return orders.filter(
        (el) =>
          Number(el.order_id) >= ordersRange[0] &&
          Number(el.order_id) <= ordersRange[1],
      );
    }
  }, [orders, ordersRange]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <S.Summary item>
          <Card title="Stan magazynowy"></Card>
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
            ordersRange={ordersRange}
            setOrdersRange={setOrdersRange}
            handleGetData={handleDownloadData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Accountancy;
