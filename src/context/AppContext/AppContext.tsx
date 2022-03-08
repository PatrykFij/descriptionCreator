import React, {
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { OrderedProduct, ShippingMethod } from 'api/types';
import { Moment } from 'moment';
import { Order } from 'types/Order';
import { Producers } from 'types/Producers';
import { Product } from 'types/Product';
import * as api from '../../api/api';
import { ProductOfferDescription } from './AppContext.types';

const appCtxDefaultValue = {
  productOfferDescription: undefined,
  setProductOfferDescription: () => {},
  products: undefined,
  getProducts: () => {},
  isLoadingProducts: false,
  producers: undefined,
  getProducers: () => {},
  isLoadingProducers: false,
  shippingMethods: undefined,
  getShippingMethods: () => {},
  isLoadingShippingMethods: false,
  orderedProducts: undefined,
  getOrderedProductsFromToRange: (startDate: Moment, endDate: Moment) => {},
  isLoadingOrderedProducts: false,
  orders: undefined,
  getOrdersFromToRange: (startDate: Moment, endDate: Moment) => {},
  isLoadingOrders: false,
};

interface ProductOfferDescriptionContext {
  productOfferDescription?: ProductOfferDescription;
  setProductOfferDescription: React.Dispatch<
    SetStateAction<ProductOfferDescription | undefined>
  >;
  products?: Product[];
  getProducts: () => void;
  isLoadingProducts: boolean;
  producers?: Producers[];
  getProducers: () => void;
  isLoadingProducers: boolean;
  shippingMethods?: ShippingMethod[];
  getShippingMethods: () => void;
  isLoadingShippingMethods: boolean;
  orderedProducts?: OrderedProduct[];
  getOrderedProductsFromToRange: (startDate: Moment, endDate: Moment) => void;
  isLoadingOrderedProducts: boolean;
  orders?: Order[];
  getOrdersFromToRange: (startDate: Moment, endDate: Moment) => void;
  isLoadingOrders: boolean;
}

export const AppContext =
  React.createContext<ProductOfferDescriptionContext>(appCtxDefaultValue);

interface Props {
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [productOfferDescription, setProductOfferDescription] = useState<
    ProductOfferDescription | undefined
  >();

  const { products, isLoadingProducts, getProducts } = api.useGetProducts();

  const { producers, isLoadingProducers, getProducers } = api.useGetProducers();

  const { shippingMethods, isLoadingShippingMethods, getShippingMethods } =
    api.useGetShippingMethod();

  const {
    orderedProducts,
    isLoadingOrderedProducts,
    getOrderedProductsFromToRange,
  } = api.useGetOrderedProducts();

  const { orders, isLoadingOrders, getOrdersFromToRange } = api.useGetOrders();

  useEffect(() => {
    localStorage.setItem(
      'descriptionValues',
      JSON.stringify(productOfferDescription),
    );
  }, [productOfferDescription]);

  const value = useMemo(
    () => ({
      productOfferDescription,
      setProductOfferDescription,
      products,
      getProducts,
      isLoadingProducts,
      producers,
      isLoadingProducers,
      getProducers,
      shippingMethods,
      isLoadingShippingMethods,
      getShippingMethods,
      orderedProducts,
      isLoadingOrderedProducts,
      getOrderedProductsFromToRange,
      orders,
      isLoadingOrders,
      getOrdersFromToRange,
    }),
    [
      getOrderedProductsFromToRange,
      getOrdersFromToRange,
      getProducers,
      getProducts,
      getShippingMethods,
      isLoadingOrderedProducts,
      isLoadingOrders,
      isLoadingProducers,
      isLoadingProducts,
      isLoadingShippingMethods,
      orderedProducts,
      orders,
      producers,
      productOfferDescription,
      products,
      shippingMethods,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
