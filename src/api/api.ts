import { useCallback } from 'react';
import { Moment } from 'moment';
import { useAxios } from 'utils/hooks/useAxios';
import {
  Order,
  OrderedProduct,
  Producers,
  Product,
  ShippingMethod,
} from './types';

export const useGetProducers = () => {
  const [{ data: producers, loading: isLoadingProducers }, getProducers] =
    useAxios<Producers[]>(
      {
        url: `/producers`,
      },
      { manual: true },
    );
  return {
    producers,
    getProducers,
    isLoadingProducers,
  };
};

export const useGetProducts = () => {
  const [{ data: products, loading: isLoadingProducts }, getProducts] =
    useAxios<Product[]>(
      {
        url: `/products`,
      },
      { manual: true },
    );

  return {
    products,
    isLoadingProducts,
    getProducts,
  };
};

interface PutDescriptionData {
  description: string;
}
export const useUpdateOffer = () => {
  const [{ loading: isUpdateLoading }, updateDescription] = useAxios(
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true },
  );

  const updateOffer = useCallback(
    async (productId, data: PutDescriptionData) => {
      const url = `/products/${productId}`;
      await updateDescription({ url, data });
    },
    [updateDescription],
  );

  return {
    isUpdateLoading,
    updateOffer,
  };
};

export const useGetOrderedProducts = () => {
  const [
    { data: orderedProducts, loading: isLoadingOrderedProducts },
    getOrderedProducts,
  ] = useAxios<OrderedProduct[]>({}, { manual: true });

  const getOrderedProductsFromToRange = useCallback(
    async (startDate: Moment, endDate: Moment) => {
      const url = `/ordered-products?dateFrom=${startDate.format(
        'YYYY-MM-DD HH:mm:ss',
      )}&dateTo=${endDate.format('YYYY-MM-DD HH:mm:ss')}`;
      return await getOrderedProducts({ url });
    },
    [getOrderedProducts],
  );

  return {
    isLoadingOrderedProducts,
    getOrderedProducts,
    orderedProducts,
    getOrderedProductsFromToRange,
  };
};

export const useGetOrders = () => {
  const [{ data: orders, loading: isLoadingOrders }, getOrders] = useAxios<
    Order[]
  >({}, { manual: true });

  const getOrdersFromToRange = useCallback(
    async (startDate: Moment, endDate: Moment) => {
      const url = `/orders?dateFrom=${startDate.format(
        'YYYY-MM-DD HH:mm:ss',
      )}&dateTo=${endDate.format('YYYY-MM-DD HH:mm:ss')}`;
      return await getOrders({ url });
    },
    [getOrders],
  );

  return {
    isLoadingOrders,
    orders,
    getOrdersFromToRange,
  };
};
export const useGetShippingMethod = () => {
  const [
    { data: shippingMethods, loading: isLoadingShippingMethods },
    getShippingMethods,
  ] = useAxios<ShippingMethod[]>(
    {
      url: `/shippings-method`,
    },
    { manual: true },
  );
  return {
    isLoadingShippingMethods,
    getShippingMethods,
    shippingMethods,
  };
};
