import { Product } from 'types/Product';
import { MappedOrder, ProductInOrder } from 'utils/mappers/types';

export const sumOfAllProductsPriceBuying = (products: Product[]) => {
  return products
    .map(
      ({ stock }: Product) => Number(stock.stock) * Number(stock.price_buying),
    )
    .reduce((prev, next) => prev + next, 0);
};
export const sumOfAllProductsPrice = (products: Product[]) => {
  return products
    .map(({ stock }: Product) => Number(stock.stock) * Number(stock.price))
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfOrderProductsPriceBuying = (products: ProductInOrder[]) => {
  return products
    .map(
      ({ quantity, price_buying }: ProductInOrder) =>
        Number(quantity) * Number(price_buying),
    )
    .reduce((prev, next) => prev + next, 0)
    .toFixed(2);
};

export const sumOfOrdersProducts = (products: ProductInOrder[]) => {
  return products
    .map(({ quantity }: ProductInOrder) => Number(quantity))
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfAllOrdersPriceBuying = (products: MappedOrder[]) => {
  return products
    .map((el) => Number(sumOfOrderProductsPriceBuying(el.productsInOrder)))
    .reduce((prev, next) => prev + next, 0)
    .toFixed(2);
};

export const sumOfAllOrdersPricePaid = (products: MappedOrder[]) => {
  return products
    .map((el) => Number(el.paid))
    .reduce((prev, next) => prev + next, 0)
    .toFixed(2);
};
