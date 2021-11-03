import { useCallback, useMemo } from "react";
import { useAxios } from "hooks/useAxios";

export const useGetOrders = () => {
  const [{ data: products, loading: isLoadingProducts }, getProducts] = useAxios({}, { manual: true });

  const getAllProducts = useCallback(async () => {
    let list;
    const url = `node-fetch?url=products&limit=50`;
    const {
      data: { data },
    } = await getProducts({ url });
    list = data.list;

    if (data.pages > 1) {
      for (let i = 2; i <= data.pages; i++) {
        const url = `node-fetch?url=products&limit=50&page=${i}`;
        const {
          data: { data },
        } = await getProducts({ url });
        const test = data.list;
        list = [...list, ...data.list];
      }
    }
  }, [getProducts]);

  return {
    products,
    isLoadingProducts,
    getAllProducts,
  };
};
