import { MappedOrder } from './types';

export const mapOrdersRange = (orders: MappedOrder[]): number[] => {
  const ordersId = orders.map((el) => Number(el.order_id));
  return [Math.min(...ordersId), Math.max(...ordersId)];
};
