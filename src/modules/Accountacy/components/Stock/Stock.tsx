import { useMemo } from 'react';
import { Product } from 'types/Product';
import {
  sumOfAllProductsPrice,
  sumOfAllProductsPriceBuying,
} from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import * as S from './styles';

interface Props {
  products: Product[];
}
const Stock = ({ products }: Props) => {
  const stockData = useMemo(() => {
    if (products) {
      return {
        sumOfPriceBuying: numberFormatter(
          sumOfAllProductsPriceBuying(products),
        ),
        sumOfPlannedSales: numberFormatter(sumOfAllProductsPrice(products)),
        plannedProfit: numberFormatter(
          sumOfAllProductsPrice(products) -
            sumOfAllProductsPriceBuying(products),
        ),
      };
    }
  }, [products]);

  return (
    <S.StockWrapper>
      {products && stockData ? (
        <>
          <h6>Całkowita kwota zakupu / Kwota sprzedaży</h6>
          <h1>
            {stockData.sumOfPriceBuying} zł / {stockData.sumOfPlannedSales} zł
          </h1>
          <h6>Planowany zysk</h6>
          <h1>{stockData.plannedProfit} zł</h1>
        </>
      ) : (
        <h6>Brak produktów, pobierz dane...</h6>
      )}
    </S.StockWrapper>
  );
};

export default Stock;
