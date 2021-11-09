import { Order } from 'types/Order';
import { OrderedProduct } from 'types/OrderedProduct';
import { Product } from 'types/Product';

export interface Data {
  allProducts: Product[];
  allOrders: Order[];
  allOrderedProducts: OrderedProduct[];
}

export interface ProductInOrder {
  product_id: string;
  name: string;
  quantity: string;
  price: string;
  stock_id: string;
  price_buying: string;
}

export interface MappedOrder {
  order_id: string;
  paid: string;
  is_paid: string;
  sum: string;
  productsInOrder: ProductInOrder[];
}
