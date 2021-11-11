import { useEffect, useState } from 'react';
import Card from 'components/Card';
import DataRow from 'components/DataRow';
import {
  sumOfAllOrdersPriceBuying,
  sumOfAllOrdersPricePaid,
} from 'utils/counters/counters';
import { MappedOrder } from 'utils/mappers/types';

interface Props {
  ordersByRange?: MappedOrder[];
}

interface Summary {
  ordersAmount: string;
  sumOfPaidPrice: string;
  sumOfPriceBuying: string;
}

const Summary = ({ ordersByRange }: Props) => {
  const [summaryData, setSummaryData] = useState<Summary>({} as Summary);
  useEffect(() => {
    if (ordersByRange) {
      const data = {
        ordersAmount: `${ordersByRange.length}`,
        sumOfPaidPrice: `${sumOfAllOrdersPricePaid(ordersByRange)}`,
        sumOfPriceBuying: `${sumOfAllOrdersPriceBuying(ordersByRange)}`,
      };
      setSummaryData(data);
    }
  }, [ordersByRange]);

  return (
    <Card title="Podsumowanie">
      <DataRow label="Ilość zamówień" value={summaryData.ordersAmount} />
      <DataRow label="Kwota sprzedaży" value={summaryData.sumOfPaidPrice} />
      <DataRow label="Kwota zakupu" value={summaryData.sumOfPriceBuying} />
      <DataRow
        label="Zysk"
        value={(
          Number(summaryData.sumOfPaidPrice) -
          Number(summaryData.sumOfPriceBuying)
        ).toFixed(2)}
      />
      <DataRow label="Issuer" value="test" />
    </Card>
  );
};

export default Summary;
