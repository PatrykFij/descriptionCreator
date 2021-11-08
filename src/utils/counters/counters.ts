import { Product } from 'types/Product';

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
