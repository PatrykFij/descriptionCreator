export interface Summary {
  ordersAmount: string;
  sumOfPaidPrice: string;
  sumOfPriceBuying: string;
  sumOfShippings: string;
  profitWithVat: string;
  profitNet: string;
  taxDeductible: string;
  incomingTax: string;
  clearProfit: string;
  transferAmount: string;
}
export interface SummaryRowData {
  label: string;
  value: string;
}
