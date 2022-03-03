import { Data, MappedOrder } from './types';

export const mapOrdersWithBuyingPrice = (data: Data): MappedOrder[] => {
  const ordersWithBuyingPrice: any = [];
  if (data.hasOwnProperty('orders')) {
    data.orders
      .filter(({ is_paid }) => is_paid)
      .map(
        ({
          order_id,
          paid,
          is_paid,
          sum,
          date,
          shipping_cost,
          shipping_id,
        }) => {
          const obj: any = {
            order_id,
            paid,
            is_paid,
            sum,
            date,
            shipping_cost,
          };

          obj.shipping_name = data.shippingMethods.filter(
            (el) => el.shipping_id === shipping_id,
          )[0].name;

          obj.productsInOrder = [];

          data.orderedProducts
            .filter(({ order_id: id }) => id === order_id)
            .map(({ product_id, name, quantity, price, stock_id }) => {
              const productStock = data.products.filter(
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
        },
      );
  }
  return ordersWithBuyingPrice.sort(
    (a: MappedOrder, b: MappedOrder) => Number(b.order_id) - Number(a.order_id),
  );
};
