import * as T from './types';

export const summaryRows = (summaryData: T.Summary): T.SummaryRowData[] => [
  {
    label: 'Ilość zamówień',
    value: summaryData.ordersAmount,
  },
  {
    label: 'Kwota sprzedaży produktów (Sprzedaż z VAT, bez transportu)',
    value: summaryData.sumOfPaidPrice,
  },
  {
    label: 'Kwota zakupu produktów (Zakup z VAT)',
    value: summaryData.sumOfPriceBuying,
  },
  {
    label: 'Kwota transport',
    value: summaryData.sumOfShippings,
  },
  {
    label: 'Zysk (Zysk z VAT)',
    value: summaryData.profitWithVat,
  },
  {
    label: 'Zysk netto',
    value: summaryData.profitNet,
  },
  {
    label: 'VAT do odliczenia',
    value: summaryData.taxDeductible,
  },
  {
    label: 'Podatek dochodowy',
    value: summaryData.incomingTax,
  },
  {
    label:
      'Kwota przelania na brillar (Sprzedaż z VAT - VAT - podatek dochodowy + transport',
    value: summaryData.transferAmount,
  },
  {
    label: 'Czysty zysk',
    value: summaryData.clearProfit,
  },
];
