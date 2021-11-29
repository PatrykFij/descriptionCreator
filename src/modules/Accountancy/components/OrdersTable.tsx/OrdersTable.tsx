import { Dispatch, SetStateAction } from 'react';
import {
  CircularProgress,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Moment } from 'moment';
import Button from 'components/Button';
import Card from 'components/Card';
import { sumOfOrderProductsPriceBuying } from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import { MappedOrder } from 'utils/mappers/types';
import OrdersRange from './components';
import * as S from './styles';

interface Props {
  isLoading: boolean;
  orders?: MappedOrder[];
  ordersByRange?: MappedOrder[];
  range?: number[];
  setRange: Dispatch<SetStateAction<number[] | undefined>>;
  dateRange: Moment[];
  setDateRange: Dispatch<SetStateAction<Moment[]>>;
  handleGetData: () => Promise<void>;
  maxOrderId: number;
}

const OrdersTable = ({
  isLoading,
  orders,
  ordersByRange,
  setRange,
  range,
  handleGetData,
  maxOrderId,
  dateRange,
  setDateRange,
}: Props) => {
  return (
    <>
      <Card
        id="ordersTable"
        title="Zamówienia"
        customAction={
          <>
            <OrdersRange dateRange={dateRange} setDateRange={setDateRange} />
            {/* {range && (
            <RangeInput
              width={800}
              handleRangeChange={setRange}
              range={range}
              disabled={isLoading}
              maxOrderId={maxOrderId}
            />
          )} */}
            {orders ? (
              <S.UpdateButtonWrapper>
                <Button isLoading={isLoading} onClick={handleGetData}>
                  Aktualizuj dane
                </Button>
                <p>Ostatnia aktualizajca:</p>
                <p>
                  {JSON.parse(localStorage.getItem('data') || '{}')?.lastUpdate}
                </p>
              </S.UpdateButtonWrapper>
            ) : (
              <Button isLoading={isLoading} onClick={handleGetData}>
                Pobierz zamówienia
              </Button>
            )}
          </>
        }
      >
        <S.TableWrapper>
          {isLoading ? (
            <S.LoadingWrapper>
              <CircularProgress />
            </S.LoadingWrapper>
          ) : (
            <S.OrdersTable stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="left">Data zamówienia</TableCell>
                  <TableCell align="center">Zapłacona kwota</TableCell>
                  <TableCell align="center">Kwota zakupu produktów</TableCell>
                  <TableCell align="center">Zysk</TableCell>
                  <TableCell align="center">Kwota przysyłki</TableCell>
                  <TableCell align="left">Typ przesłki</TableCell>
                  <TableCell align="left">Produkty w zamówieniu</TableCell>
                </TableRow>
              </TableHead>
              <S.OrdersList>
                {ordersByRange ? (
                  ordersByRange?.map(
                    ({
                      order_id,
                      date,
                      paid,
                      productsInOrder,
                      shipping_cost,
                      shipping_name,
                      sum,
                    }) => (
                      <TableRow key={order_id}>
                        <TableCell align="center" scope="row">
                          {order_id}
                        </TableCell>
                        <TableCell align="left" scope="row">
                          {date}
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {paid}
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {sumOfOrderProductsPriceBuying(productsInOrder)}
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {numberFormatter(
                            `${
                              Number(sum) -
                              Number(
                                sumOfOrderProductsPriceBuying(productsInOrder),
                              )
                            }`,
                          )}
                        </TableCell>
                        <TableCell align="center" scope="row">
                          {numberFormatter(shipping_cost)}
                        </TableCell>
                        <TableCell align="left" scope="row">
                          {shipping_name}
                        </TableCell>

                        <TableCell align="left" scope="row">
                          {productsInOrder.map(
                            ({ name, quantity, price_buying }) => (
                              <S.Product key={name}>
                                {quantity}szt. (cena zakupu {price_buying}/szt.)
                                -{name}
                              </S.Product>
                            ),
                          )}
                        </TableCell>
                      </TableRow>
                    ),
                  )
                ) : (
                  <S.NoDataWrapper>
                    <h2>Brak danych, pobierz zamówienia...</h2>
                  </S.NoDataWrapper>
                )}
              </S.OrdersList>
            </S.OrdersTable>
          )}
        </S.TableWrapper>
      </Card>
    </>
  );
};

export default OrdersTable;
