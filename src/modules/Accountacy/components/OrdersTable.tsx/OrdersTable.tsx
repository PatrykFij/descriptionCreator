import { Dispatch, SetStateAction, useMemo } from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { Column } from 'material-table';
import Button from 'components/Button';
import Card from 'components/Card';
import RangeInput from 'components/RangeInput';
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
}

const OrdersTable = ({
  isLoading,
  orders,
  ordersByRange,
  setRange,
  range,
  handleGetData,
}: Props) => {
  const columns: Column<MappedOrder>[] = useMemo(
    () => [
      {
        title: 'ID',
        field: 'order_id',
        type: 'string',
        width: '5%',
      },
      {
        title: 'Data zamówienia',
        field: 'date',
        width: '10%',
      },
      {
        title: 'Zapłacona kwota',
        field: 'sum',
        width: '5%',
        render: ({ sum }) => numberFormatter(sum),
      },
      {
        title: 'Kwota zakupu produktów',
        field: 'productsInOrder',
        render: ({ productsInOrder }) =>
          sumOfOrderProductsPriceBuying(productsInOrder),
        width: '5%',
      },
      {
        title: 'Kwota przysyłki',
        field: 'shipping_cost',
        width: '5%',
        render: ({ shipping_cost }) => numberFormatter(shipping_cost),
      },
      {
        title: 'Typ przesłki',
        field: 'shipping_name',
        width: '15%',
      },
      {
        title: 'Zysk',
        field: 'profit',
        width: '5%',
        render: ({ sum, productsInOrder }) =>
          numberFormatter(
            `${
              Number(sum) -
              Number(sumOfOrderProductsPriceBuying(productsInOrder))
            }`,
          ),
      },
      {
        title: 'Produkty w zamówieniu',
        field: 'productsInOrder',
        width: '50%',
        render: (a) =>
          a.productsInOrder.map(({ name, quantity }) => (
            <S.Product key={name}>
              {quantity}szt. - {name}
            </S.Product>
          )),
      },
    ],
    [],
  );

  return (
    <Card
      id="ordersTable"
      title="Zamówienia"
      customAction={
        <>
          {range && (
            <RangeInput
              width={800}
              handleRangeChange={setRange}
              range={range}
              disabled={isLoading}
            />
          )}
          <Button onClick={handleGetData}>
            {orders ? 'Aktualizuj dane' : 'Pobierz zamówienia'}
          </Button>
        </>
      }
    >
      {/* <Table
        columns={columns}
        data={orders}
        options={{
          pageSize: 5,
          paging: false,
          sorting: false,
          filtering: false,
          maxBodyHeight: '50rem',
        }}
        isLoading={isLoading}
      /> */}
      <S.TableWrapper>
        <S.OrdersTable stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="left">Data zamówienia</TableCell>
              <TableCell align="center">Zapłacona kwota</TableCell>
              <TableCell align="center">Kwota zakupu produktów</TableCell>
              <TableCell align="center">Kwota przysyłki</TableCell>
              <TableCell align="left">Typ przesłki</TableCell>
              <TableCell align="center">Zysk</TableCell>
              <TableCell align="left">Produkty w zamówieniu</TableCell>
            </TableRow>
          </TableHead>
          <S.OrdersList>
            {ordersByRange?.map(
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
                    {numberFormatter(shipping_cost)}
                  </TableCell>
                  <TableCell align="left" scope="row">
                    {shipping_name}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {numberFormatter(
                      `${
                        Number(sum) -
                        Number(sumOfOrderProductsPriceBuying(productsInOrder))
                      }`,
                    )}
                  </TableCell>
                  <TableCell align="left" scope="row">
                    {productsInOrder.map(({ name, quantity }) => (
                      <S.Product key={name}>
                        {quantity}szt. - {name}
                      </S.Product>
                    ))}
                  </TableCell>
                </TableRow>
              ),
            )}
          </S.OrdersList>
        </S.OrdersTable>
      </S.TableWrapper>
    </Card>
  );
};

export default OrdersTable;
