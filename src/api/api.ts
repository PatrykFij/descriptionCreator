import { useCallback, useMemo } from 'react';
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

  const mappedOffers = useMemo(
    () =>
      products?.map((el) => ({
        id: el.product_id,
        name: el.translations.pl_PL.name,
        description: el.translations.pl_PL.description,
        url: `${el.translations.pl_PL.permalink}?preview=true`,
      })),
    [products],
  );

  return {
    products,
    mappedOffers,
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
  ] = useAxios<OrderedProduct[]>(
    {
      url: `/ordered-products`,
    },
    { manual: true },
  );
  return {
    isLoadingOrderedProducts,
    getOrderedProducts,
    orderedProducts,
  };
};

export const useGetOrders = (startDate: Moment, endDate: Moment) => {
  const [{ data: orders, loading: isLoadingOrders }, getOrders] = useAxios<
    Order[]
  >(
    {
      url: `/orders?dateFrom=${startDate.format(
        'YYYY-MM-DD HH:mm:ss',
      )}&dateTo=${endDate.format('YYYY-MM-DD HH:mm:ss')}`,
    },
    { manual: true },
  );
  return {
    isLoadingOrders,
    getOrders,
    orders,
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
