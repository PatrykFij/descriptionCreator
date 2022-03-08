export interface Order {
  order_id: string;
  sum: string;
  is_paid: boolean;
  paid: string;
  date: string;
  shipping_cost: string;
  shipping_id: string;
  auction?: string;
}
