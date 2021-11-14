import { useMemo } from 'react';
import {
  sumOfAllProductsPrice,
  sumOfAllProductsPriceBuying,
} from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import * as S from './styles';

const Stock = () => {
  const products = useMemo(
    () => JSON.parse(localStorage.getItem('data') || '{}')?.allProducts || [],
    [],
  );

  const sumOfPriceBuying = numberFormatter(
    sumOfAllProductsPriceBuying(products),
  );
  const sumOfPlannedSales = numberFormatter(sumOfAllProductsPrice(products));
  const plannedProfit = numberFormatter(
    sumOfAllProductsPrice(products) - sumOfAllProductsPriceBuying(products),
  );

  return (
    <S.StockWrapper>
      {products ? (
        <>
          <h6>Całkowita kwota zakupu / Kwota sprzedaży</h6>
          <h1>
            {sumOfPriceBuying} zł / {sumOfPlannedSales} zł
          </h1>
          <h6>Planowany zysk</h6>
          <h1>{plannedProfit} zł</h1>
        </>
      ) : (
        <h6>Brak produktów, pobierz dane...</h6>
      )}
    </S.StockWrapper>
  );
};

export default Stock;
