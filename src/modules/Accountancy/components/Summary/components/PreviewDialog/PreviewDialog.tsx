import { useMemo, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Button from 'components/Button';
import DataRow from 'components/DataRow';
import Dialog from 'components/Dialog';
import { sumOfOrderProductsPriceBuying } from 'utils/counters/counters';
import { numberFormatter } from 'utils/formatters/numberFormatter';
import { MappedOrder } from 'utils/mappers/types';
import { summaryRows } from '../../SummaryFields';
import * as T from '../../types';
import * as S from './styles';

interface Props {
  onClose: () => void;
  ordersByRange?: MappedOrder[];
  summaryData: T.Summary;
}

const PreviewDialog = ({ onClose, ordersByRange, summaryData }: Props) => {
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

  return (
    <Dialog
      title="Podgląd"
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
        <h1>Zestawienie zamówień</h1>
        <S.PrintOrderTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data zamówienia</th>
              <th>Wartość zamówienia</th>
              <th>Wartość zakupu</th>
              <th>Koszt transportu</th>
              <th>Zysk (z VAT)</th>
              <th>Rodzaj transportu</th>
              <th>Zamówione produkty</th>
            </tr>
          </thead>
          <tbody>
            {ordersByRange?.map(
              ({
                order_id,
                date,
                sum,
                shipping_cost,
                shipping_name,
                productsInOrder,
              }) => (
                <tr>
                  <td>{order_id}</td>
                  <td>{date}</td>
                  <td>{sum}</td>
                  <td>{sumOfOrderProductsPriceBuying(productsInOrder)}</td>
                  <td>{shipping_cost}</td>
                  <td>
                    {numberFormatter(
                      `${
                        Number(sum) -
                        Number(sumOfOrderProductsPriceBuying(productsInOrder))
                      }`,
                    )}
                  </td>
                  <td>{shipping_name}</td>
                  <td>
                    {productsInOrder.map(({ name, quantity, price_buying }) => (
                      <p>
                        {quantity}szt. (cena zakupu {price_buying}/szt.) -{name}
                      </p>
                    ))}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </S.PrintOrderTable>
        <S.PrintSummarizeTable>
          <h1>Podsumowanie</h1>
          {summarizeRows.map(({ label, value }: T.SummaryRowData) => (
            <DataRow label={label} value={value} />
          ))}
        </S.PrintSummarizeTable>
      </div>
    </Dialog>
  );
};

export default PreviewDialog;
