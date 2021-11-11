import { Dispatch, SetStateAction } from 'react';
import { Column } from 'material-table';
import Button from 'components/Button';
import Card from 'components/Card';
import RangeInput from 'components/RangeInput';
import Table from 'components/Table';
import { sumOfOrderProductsPriceBuying } from 'utils/counters/counters';
import { MappedOrder } from 'utils/mappers/types';

const columns: Column<MappedOrder>[] = [
  {
    title: 'ID',
    field: 'order_id',
    type: 'string',
    width: '5%',
  },
  {
    title: 'Zapłacona kwota',
    field: 'paid',
    width: '7%',
    // TODO - add users here and in the interface for 'Advisor'
  },
  {
    title: 'Zapłacona kwota',
    field: 'sum',
    width: '7%',
    // TODO - add users here and in the interface for 'Advisor'
  },
  {
    title: 'Produkty w zamówieniu',
    field: 'productsInOrder',
    render: (a) => a.productsInOrder.map(({ name }) => `${name}`),
    width: '15%',
    // TODO - add users here and in the interface for 'Advisor'
  },
  {
    title: 'Kwota zakupu produktów',
    field: 'productsInOrder',
    render: (a) => sumOfOrderProductsPriceBuying(a.productsInOrder),
    // TODO - add users here and in the interface for 'Advisor'
  },
];

interface Props {
  isLoading: boolean;
  orders?: MappedOrder[];
  ordersByRange?: MappedOrder[];
  ordersRange?: number[];
  setOrdersRange: Dispatch<SetStateAction<number[] | undefined>>;
  handleGetData: () => Promise<void>;
}

const OrdersTable = ({
  isLoading,
  orders,
  ordersByRange,
  setOrdersRange,
  ordersRange,
  handleGetData,
}: Props) => {
  return (
    <Card
      title="Zamówienia"
      customAction={
        <>
          {ordersRange && (
            <RangeInput
              width={500}
              handleRangeChange={setOrdersRange}
              ordersRange={ordersRange}
            />
          )}
          <Button onClick={handleGetData}>
            {orders ? 'Pobierz zamówienia' : 'Aktualizuj dane'}
          </Button>
        </>
      }
    >
      <Table
        columns={columns}
        data={ordersByRange}
        options={{
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
