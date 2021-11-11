import { useCallback, useState } from 'react';
import { useAxios } from 'hooks/useAxios';

export const useGetProducts = () => {
  const [, getProducts] = useAxios({}, { manual: true });

  const [isLoading, setIsLoading] = useState(false);
  const getAllProducts = useCallback(async () => {
    setIsLoading(true);
    let list = [];
    const url = `node-fetch?url=products&limit=50`;
    const {
      data: { data },
    } = await getProducts({ url });
    list.push(...data.list);

    if (data.pages > 1) {
      for (let i = 2; i <= data.pages; i++) {
        const url = `node-fetch?url=products&limit=50&page=${i}`;
        const {
          data: { data },
        } = await getProducts({ url });
        list.push(...data.list);
      }
      setIsLoading(false);
      return list;
    }
  }, [getProducts]);

  return {
    isLoading,
    getAllProducts,
  };
};

export const useGetOrders = () => {
  const [, getOrders] = useAxios({}, { manual: true });

  const [isLoading, setIsLoading] = useState(false);
  const getAllOrders = useCallback(async () => {
    setIsLoading(true);
    let list = [];
    const url = `node-fetch?url=orders&limit=50`;
    const {
      data: { data },
    } = await getOrders({ url });
    list.push(...data.list);

    if (data.pages > 1) {
      for (let i = 2; i <= data.pages; i++) {
        const url = `node-fetch?url=orders&limit=50&page=${i}`;
        const {
          data: { data },
        } = await getOrders({ url });
        list.push(...data.list);
      }
      setIsLoading(false);
      return list;
    }
  }, [getOrders]);

  return {
    isLoading,
    getAllOrders,
  };
};

export const useGetOrderedProducts = () => {
  const [, getOrderedProducts] = useAxios({}, { manual: true });

  const [isLoading, setIsLoading] = useState(false);

  const getAllOrderedProducts = useCallback(async () => {
    setIsLoading(true);
    let list = [];
    const url = `node-fetch?url=order-products&limit=50`;
    const {
      data: { data },
    } = await getOrderedProducts({ url });
    list.push(...data.list);

    if (data.pages > 1) {
      for (let i = 2; i <= data.pages; i++) {
        const url = `node-fetch?url=order-products&limit=50&page=${i}`;
        const {
          data: { data },
        } = await getOrderedProducts({ url });
        list.push(...data.list);
      }
    }
    setIsLoading(false);
    return list;
  }, [getOrderedProducts]);

  return {
    isLoading,
    getAllOrderedProducts,
  };
};

export const useGetShippingMethod = () => {
  const [{ loading: isLoadingShippings }, getShippings] = useAxios(
    { url: 'node-fetch?url=shippings&limit=50' },
    { manual: true },
  );

  const getShippingMethods = useCallback(async () => {
    const response = await getShippings();
    return response.data.data.list;
  }, [getShippings]);

  return {
    isLoadingShippings,
    getShippingMethods,
  };
};
