import { useEffect, useMemo, useState } from 'react';
import { useToggle } from 'hooks/useToggle';
import Button from 'components/Button';
import Card from 'components/Card';
import DataRow from 'components/DataRow';
import { countSummarize } from 'utils/counters/counters';
import { MappedOrder } from 'utils/mappers/types';
import PreviewDialog from './components/PreviewDialog';
import { summaryRows } from './SummaryFields';
import * as T from './types';

interface Props {
  ordersByRange?: MappedOrder[];
}
const Summary = ({ ordersByRange }: Props) => {
  const [summaryData, setSummaryData] = useState<T.Summary>({} as T.Summary);

  useEffect(() => {
    if (ordersByRange) {
      const summarizeResult = countSummarize(ordersByRange);
      setSummaryData(summarizeResult);
    }
  }, [ordersByRange]);

  const [isPreviewOpen, openPreview, closePreview] = useToggle();
  const summarizeRows = useMemo(() => summaryRows(summaryData), [summaryData]);

  return (
    <Card
      title="Podsumowanie"
      customAction={<Button onClick={openPreview}>Podgląd</Button>}
    >
      {isPreviewOpen && (
        <PreviewDialog
          ordersByRange={ordersByRange}
          summaryData={summaryData}
          onClose={closePreview}
        />
      )}

      {summarizeRows.map(({ label, value }: T.SummaryRowData) => (
        <DataRow label={label} value={value} />
      ))}
    </Card>
  );
};

export default Summary;
