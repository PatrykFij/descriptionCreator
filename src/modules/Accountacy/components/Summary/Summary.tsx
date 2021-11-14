import { useEffect, useState } from 'react';
import { useToggle } from 'hooks/useToggle';
import Button from 'components/Button';
import Card from 'components/Card';
import DataRow from 'components/DataRow';
import {
  sumOfAllOrdersPriceBuying,
  sumOfAllOrdersPricePaid,
  sumOfAllOrdersShippings,
} from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import { MappedOrder } from 'utils/mappers/types';
import PreviewDialog from './components/PreviewDialog';

interface Props {
  ordersByRange?: MappedOrder[];
}

export interface Summary {
  ordersAmount: number;
  sumOfPaidPrice: number;
  sumOfPriceBuying: number;
  sumOfShippings: number;
  profitWithVat: number;
  profitNet: number;
  taxDeductible: number;
  incomingTax: number;
  clearProfit: number;
}

const Summary = ({ ordersByRange }: Props) => {
  const [summaryData, setSummaryData] = useState<Summary>({} as Summary);

  useEffect(() => {
    if (ordersByRange) {
      const ordersAmount = ordersByRange.length;
      const sumOfShippings = sumOfAllOrdersShippings(ordersByRange);
      const sumOfPaidPrice =
        sumOfAllOrdersPricePaid(ordersByRange) - sumOfShippings;
      const sumOfPriceBuying = sumOfAllOrdersPriceBuying(ordersByRange);
      const profitWithVat = sumOfPaidPrice - sumOfPriceBuying;
      const profitNet = (profitWithVat * 100) / 123;
      const taxDeductible = profitWithVat - profitNet;
      const incomingTax = profitNet * 0.17;
      const clearProfit = profitNet - incomingTax;

      const data = {
        ordersAmount,
        sumOfPaidPrice,
        sumOfPriceBuying,
        sumOfShippings,
        profitWithVat,
        profitNet,
        taxDeductible,
        incomingTax,
        clearProfit,
      };
      setSummaryData(data);
    }
  }, [ordersByRange]);

  const [isPreviewOpen, openPreview, closePreview] = useToggle();
  return (
    <Card
      title="Podsumowanie"
      customAction={<Button onClick={openPreview}>Podgląd</Button>}
    >
      {isPreviewOpen && (
        <PreviewDialog
          ordersByRange={ordersByRange}
          summaryData={summaryData}
          onClose={closePreview}
        />
      )}

      <DataRow
        label="Ilość zamówień"
        value={`${summaryData.ordersAmount || '0'} `}
      />
      <DataRow
        label="Kwota sprzedaży produktów (Sprzedaż z VAT, bez transportu)"
        value={numberFormatter(summaryData.sumOfPaidPrice)}
      />
      <DataRow
        label="Kwota zakupu produktów (Zakup z VAT)"
        value={numberFormatter(summaryData.sumOfPriceBuying)}
      />
      <DataRow
        label="Kwota transport"
        value={numberFormatter(summaryData.sumOfShippings)}
      />
      <DataRow
        label="Zysk (Zysk z VAT)"
        value={numberFormatter(summaryData.profitWithVat)}
      />
      <DataRow
        label="Zysk netto"
        value={numberFormatter(summaryData.profitNet)}
      />
      <DataRow
        label="VAT do odliczenia"
        value={numberFormatter(summaryData.taxDeductible)}
      />
      <DataRow
        label="Podatek dochodowy"
        value={numberFormatter(summaryData.incomingTax)}
      />
      <DataRow
        label="Czysty zysk"
        value={numberFormatter(summaryData.clearProfit)}
      />
    </Card>
  );
};

export default Summary;
