import { useState } from 'react';
import { useCallback } from 'react';
import { useAxios } from 'hooks/useAxios';

export const useGetOrders = () => {
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
