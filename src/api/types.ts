interface Stock {
  price_buying: string;
  price: string;
  stock: string;
}

interface Translation {
  pl_PL: PLTranslation;
}

export interface PLTranslation {
  product_id: string;
  name: string;
  short_description: string;
  description: string;
  active: string;
  seo_url: string;
  permalink: string;
}

export interface Product {
  product_id: string;
  stock: Stock;
  translations: Translation;
  isPaid: boolean;
  total_products: string;
  promo_price: string | null;
}

export interface Producers {
  gfx: string;
  producer_id: string;
  name: string;
}

export interface OrderedProduct {
  id: string;
  order_id: string;
  name: string;
  price: string;
  product_id: string;
  stock_id: string;
  quantity: string;
}

export interface Order {
  order_id: string;
  sum: string;
  is_paid: boolean;
  paid: string;
  date: string;
  shipping_cost: string;
  shipping_id: string;
}

export interface ShippingMethod {
  shipping_id: string;
  name: string;
}
