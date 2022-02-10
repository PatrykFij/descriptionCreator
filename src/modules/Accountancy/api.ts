import { Order } from 'types/Order';
import { useAxios } from 'utils/hooks/useAxios';
import { OrderedProduct } from './../../types/OrderedProduct';
import { Product } from './../../types/Product';
import { ShippingMethod } from './../../utils/mappers/types';

export const useGetProducts = () => {
  const [{ loading: isLoadingProducts }, getProducts] = useAxios<Product[]>(
    {
      url: `/products`,
    },
    { manual: true },
  );
  return {
    isLoadingProducts,
    getProducts,
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
