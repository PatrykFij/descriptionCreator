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

export const useUpdateOffer = (productId: string) => {
  const [, updateOffer] = useAxios(
    {
      url: `/products/${productId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true },
  );
  return {
    updateOffer,
  };
};

export const useGetOrderedProducts = () => {
  const [{ loading: isLoadingOrderedProducts }, getOrderedProducts] = useAxios<
    OrderedProduct[]
  >(
    {
      url: `/ordered-products`,
    },
    { manual: true },
  );
  return {
    isLoadingOrderedProducts,
    getOrderedProducts,
  };
};

export const useGetOrders = () => {
  const [{ loading: isLoadingOrders }, getOrders] = useAxios<Order[]>(
    {
      url: `/orders`,
    },
    { manual: true },
  );
  return {
    isLoadingOrders,
    getOrders,
  };
};
export const useGetShippingMethod = () => {
  const [{ loading: isLoadingShippingMethods }, getShippingMethods] = useAxios<
    ShippingMethod[]
  >(
    {
      url: `/shippings-method`,
    },
    { manual: true },
  );
  return {
    isLoadingShippingMethods,
    getShippingMethods,
  };
};
