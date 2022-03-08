import { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Button } from 'components';
import DataRow from 'components/DataRow';
import Dialog from 'components/Dialog';
import Table from 'components/Table';
import { sumOfOrderProductsPriceBuying } from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import { MappedOrder } from 'utils/mappers/types';
import { summaryRows } from '../../SummaryFields';
import * as T from '../../types';
import * as S from './styles';

interface Props {
  open: boolean;
  onClose: () => void;
  ordersByRange?: MappedOrder[];
  summaryData: T.Summary;
}

const columns = [
  { title: 'ID', field: 'id' },
  { title: 'Data zamówienia', field: 'orderDate' },
  { title: 'Wartość zamówienia', field: 'paidAmount' },
  { title: 'Wartość zakupu', field: 'buyingAmount' },
  { title: 'Koszt transportu', field: 'shipping' },
  { title: 'Zysk (z VAT)', field: 'profitWithVat' },
  { title: 'Rodzaj transportu', field: 'shippingType' },
  { title: 'Zamówione produkty', field: 'orderedProducts' },
];

const PreviewDialog = ({
  open,
  onClose,
  ordersByRange,
  summaryData,
}: Props) => {
  const componentRef = useRef(null);
  const pageStyle = `
  @page {
    size: 297mm 210mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

  const summarizeRows = useMemo(() => summaryRows(summaryData), [summaryData]);

  const dataRows = useMemo(
    () =>
      ordersByRange?.map(
        ({
          order_id,
          date,
          sum,
          shipping_cost,
          shipping_name,
          productsInOrder,
        }) => ({
          id: order_id,
          orderDate: date,
          paidAmount: sum,
          buyingAmount: sumOfOrderProductsPriceBuying(productsInOrder),
          shipping: shipping_cost,
          profitWithVat: numberFormatter(
            `${
              Number(sum) -
              Number(sumOfOrderProductsPriceBuying(productsInOrder))
            }`,
          ),
          shippingType: shipping_name,
          orderedProducts: productsInOrder.map(
            ({ name, quantity, price_buying }) => (
              <p>
                {quantity}szt. (cena zakupu ${price_buying}/szt.) -{name}
              </p>
            ),
          ),
        }),
      ),
    [ordersByRange],
  );

  return (
    <Dialog
      title="Podgląd"
      open={open}
      onClose={onClose}
      maxWidth="lg"
      dialogActions={
        <>
          <Button variant="outlined" onClick={onClose}>
            Anuluj
          </Button>
          <ReactToPrint
            pageStyle={pageStyle}
            trigger={() => <Button>Drukuj</Button>}
            content={() => componentRef.current}
          />
        </>
      }
    >
      <div ref={componentRef} id="test">
        <S.OrdersTableWrapper>
          <Table
            title="Zestawienie zamówień"
            columns={columns}
            data={dataRows}
          />
        </S.OrdersTableWrapper>
        <S.PreviewSummarize>
          <h1>Podsumowanie</h1>
          <DataRow data={summarizeRows} />
        </S.PreviewSummarize>
      </div>
    </Dialog>
  );
};

export default PreviewDialog;
