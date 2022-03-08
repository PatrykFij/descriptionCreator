import { Product } from 'types/Product';
import { Summary } from 'modules/Accountancy/components/Summary/types';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import { MappedOrder, ProductInOrder, Source } from 'utils/mappers/types';

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
    .map(({ productsInOrder }) =>
      Number(sumOfOrderProductsPriceBuying(productsInOrder)),
    )
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfAllOrdersPricePaid = (products: MappedOrder[]) => {
  return products
    .map(({ paid }) => Number(paid))
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfAllOrdersShippings = (products: MappedOrder[]) => {
  return products
    .map(({ shipping_cost }) => Number(shipping_cost))
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfAllegroCommission = (orders: MappedOrder[]) => {
  return orders
    .filter(({ source }) => source === Source.Allegro)
    .map(
      ({ paid, shipping_cost }) =>
        (Number(paid) - Number(shipping_cost)) * 0.13376847003,
    )
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfInpostShippingBelowFreeShipping = (orders: MappedOrder[]) => {
  return orders
    .filter(
      ({ source, paid, shipping_cost }) =>
        source === Source.Shoper && Number(paid) - Number(shipping_cost) > 200,
    )
    .map(({ shipping_cost }) => Number(shipping_cost))
    .reduce((prev, next) => prev + next, 0);
};

export const sumOfPackingCost = (orders: MappedOrder[]) => {
  return orders.length * 2.0;
};

export const countSummarize = (products: MappedOrder[]): Summary => {
  const ordersAmount = `${products.length}`;
  const sumOfShippings = sumOfAllOrdersShippings(products);
  const sumOfPaidPrice = sumOfAllOrdersPricePaid(products) - sumOfShippings;
  const sumOfPriceBuying = sumOfAllOrdersPriceBuying(products);
  const allegroCommission = sumOfAllegroCommission(products);
  const inpostShippingCost = sumOfInpostShippingBelowFreeShipping(products);
  const packingCost = sumOfPackingCost(products);
  const profitWithVat = sumOfPaidPrice - sumOfPriceBuying;
  const profitNet = (profitWithVat * 100) / 123;
  const taxDeductible = profitWithVat - profitNet;
  const incomingTax = profitNet * 0.17;
  const clearProfit = profitNet - incomingTax;
  const superClearProfit =
    clearProfit - allegroCommission - inpostShippingCost - packingCost;
  const transferAmount =
    sumOfPaidPrice - taxDeductible - incomingTax + sumOfShippings;

  return {
    ordersAmount,
    sumOfPaidPrice: numberFormatter(sumOfPaidPrice),
    sumOfPriceBuying: numberFormatter(sumOfPriceBuying),
    sumOfShippings: numberFormatter(sumOfShippings),
    profitWithVat: numberFormatter(profitWithVat),
    profitNet: numberFormatter(profitNet),
    taxDeductible: numberFormatter(taxDeductible),
    incomingTax: numberFormatter(incomingTax),
    clearProfit: numberFormatter(clearProfit),
    transferAmount: numberFormatter(transferAmount),
    allegroCommission: numberFormatter(allegroCommission),
    inpostShippingCost: numberFormatter(inpostShippingCost),
    packingCost: numberFormatter(packingCost),
    superClearProfit: numberFormatter(superClearProfit),
  };
};
