import { Dispatch, SetStateAction, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  CircularProgress,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { pl } from 'date-fns/locale';
import Button from 'components/Button';
import Card from 'components/Card';
import { sumOfOrderProductsPriceBuying } from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import { MappedOrder } from 'utils/mappers/types';
import * as S from './styles';

interface Props {
  isLoading: boolean;
  orders?: MappedOrder[];
  ordersByRange?: MappedOrder[];
  range?: number[];
  setRange: Dispatch<SetStateAction<number[] | undefined>>;
  handleGetData: () => Promise<void>;
  maxOrderId: number;
}

const DateRange = () => {
  const [selectedDate, handleDateChange] = useState<any>(new Date());

  const handleClose = () => {
    console.log('asdasds');
  };
  return (
    <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
      <DateTimePicker
        variant="inline"
        label="Początkowa data"
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        value={selectedDate}
        onChange={handleDateChange}
        onClose={handleClose}
      />
      <DateTimePicker
        variant="inline"
        label="Końcowa data"
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

const OrdersTable = ({
  isLoading,
  orders,
  ordersByRange,
  setRange,
  range,
  handleGetData,
  maxOrderId,
}: Props) => {
  return (
    <>
      <Card
        id="ordersTable"
        title="Zamówienia"
        customAction={
          <>
            <DateRange />
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
