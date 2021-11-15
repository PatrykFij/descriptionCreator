import { useEffect, useMemo, useState } from 'react';
import { useToggle } from 'hooks/useToggle';
import Button from 'components/Button';
import Card from 'components/Card';
import DataRow from 'components/DataRow';
import { countSummarize } from 'utils/counters/counters';
import { MappedOrder } from 'utils/mappers/types';
import PreviewDialog from './components/PreviewDialog';
import * as T from './types';

interface Props {
  ordersByRange?: MappedOrder[];
}
interface RowData {
  label: string;
  value: string;
}

const Summary = ({ ordersByRange }: Props) => {
  const [summaryData, setSummaryData] = useState<T.Summary>({} as T.Summary);

  useEffect(() => {
    if (ordersByRange) {
      const summarizeResult = countSummarize(ordersByRange);
      setSummaryData(summarizeResult);
    }
  }, [ordersByRange]);

  const summarizeRows: RowData[] = useMemo(
    () => [
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
    ],
    [summaryData],
  );

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
      {summarizeRows.map(({ label, value }: RowData) => (
        <DataRow label={label} value={value} />
      ))}
    </Card>
  );
};

export default Summary;
