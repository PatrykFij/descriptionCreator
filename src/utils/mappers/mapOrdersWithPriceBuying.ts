import { Data, MappedOrder } from './types';

export const mapOrdersWithBuyingPrice = (): MappedOrder[] => {
  const data = localStorage.getItem('data');
  const ordersWithBuyingPrice: any = [];
  if (data) {
    const parsedData = JSON.parse(data) as Data;
    parsedData.allOrders
      .filter(({ is_paid }) => is_paid)
      .map(({ order_id, paid, is_paid, sum }) => {
        const obj: any = { order_id, paid, is_paid, sum };
        obj.productsInOrder = [];
        parsedData.allOrderedProducts
          .filter(({ order_id: id }) => id === order_id)
          .map(({ product_id, name, quantity, price, stock_id }) => {
            const productStock = parsedData.allProducts.filter(
              (el) => el.product_id === product_id,
            );
            let price_buying = null;
            if (productStock.length) {
              price_buying = productStock[0].stock.price_buying;
            }
            obj.productsInOrder.push({
              product_id,
              name,
              quantity,
              price,
              stock_id,
              price_buying,
            });
          });
        ordersWithBuyingPrice.push(obj);
      });
  }
  return ordersWithBuyingPrice.sort(
    (a: MappedOrder, b: MappedOrder) => Number(b.order_id) - Number(a.order_id),
  );
};
