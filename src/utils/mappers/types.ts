import { Order } from 'types/Order';
import { OrderedProduct } from 'types/OrderedProduct';
import { Product } from 'types/Product';

export interface Data {
  products: Product[];
  orders: Order[];
  orderedProducts: OrderedProduct[];
  shippingMethods: ShippingMethod[];
  lastUpdate: string;
}

export interface ShippingMethod {
  shipping_id: string;
  name: string;
}
export interface ProductInOrder {
  product_id: string;
  name: string;
  quantity: string;
  price: string;
  stock_id: string;
  price_buying: string;
}

export enum Source {
  Allegro = 'Allegro',
  Shoper = 'Shoper',
}
export interface MappedOrder {
  order_id: string;
  paid: string;
  date: string;
  is_paid: string;
  sum: string;
  source: Source;
  shipping_name: string;
  shipping_cost: string;
  productsInOrder: ProductInOrder[];
}
