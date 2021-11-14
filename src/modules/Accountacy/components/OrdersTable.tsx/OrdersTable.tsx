import { Dispatch, SetStateAction, useMemo } from 'react';
import { Column } from 'material-table';
import Button from 'components/Button';
import Card from 'components/Card';
import RangeInput from 'components/RangeInput';
import Table from 'components/Table';
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
        width: '4%',
      },
      {
        title: 'Data zamówienia',
        field: 'date',
        width: '10%',
      },
      {
        title: 'Zapłacona kwota',
        field: 'sum',
        width: '7%',
        render: ({ sum }) => numberFormatter(sum),
      },
      {
        title: 'Kwota zakupu produktów',
        field: 'productsInOrder',
        render: ({ productsInOrder }) =>
          sumOfOrderProductsPriceBuying(productsInOrder),
        width: '7%',
      },
      {
        title: 'Kwota przysyłki',
        field: 'shipping_cost',
        width: '7%',
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
        width: '7%',
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
      <Table
        columns={columns}
        data={ordersByRange}
        options={{
          pageSize: 5,
          paging: true,
          sorting: false,
          filtering: false,
          maxBodyHeight: '50rem',
        }}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default OrdersTable;
