import { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { useToggle } from 'hooks/useToggle';
import { Button } from 'components';
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
    <>
      <Card
        title="Podsumowanie"
        customAction={<Button onClick={openPreview}>Podgląd</Button>}
      >
        <Grid container justifyContent="flex-end" spacing={10}>
          <Grid flexBasis="50%" item>
            <DataRow data={summarizeRows} />
          </Grid>
          <Grid flexBasis="50%" item>
            <DataRow data={summarizeRows} />
          </Grid>
        </Grid>
      </Card>
      <PreviewDialog
        ordersByRange={ordersByRange}
        summaryData={summaryData}
        onClose={closePreview}
        open={isPreviewOpen}
      />
    </>
  );
};

export default Summary;
