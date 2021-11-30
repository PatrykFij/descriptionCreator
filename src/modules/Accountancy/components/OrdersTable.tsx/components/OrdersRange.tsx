import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import pl from 'date-fns/locale/pl';
import { Moment } from 'moment';
import RangeInput from 'components/RangeInput';
import { MappedOrder } from 'utils/mappers/types';
import * as S from './styles';

interface Props {
  dateRange: Moment[];
  setDateRange: Dispatch<SetStateAction<Moment[]>>;
  ordersByRange?: MappedOrder[];
  maxOrderId: number;
}

const OrdersRange = ({
  dateRange,
  setDateRange,
  ordersByRange,
  maxOrderId,
}: Props) => {
  const [selectedStartDate, handleStartDateChange] = useState<any>(
    dateRange[0],
  );
  const [selectedEndDate, handleEndDateChange] = useState<any>(dateRange[1]);

  const handleChangeRange = useCallback(() => {
    setDateRange([selectedStartDate, selectedEndDate]);
  }, [selectedEndDate, selectedStartDate, setDateRange]);

  return (
    <>
      <S.RangeWrapper>
        <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
          <DateTimePicker
            label="Początkowa data"
            format="dd/MM/yyyy HH:mm"
            ampm={false}
            value={selectedStartDate}
            onChange={handleStartDateChange}
            onClose={handleChangeRange}
          />
          <S.Title>Zakres zamówień</S.Title>
          <DateTimePicker
            label="Koncowa data"
            format="dd/MM/yyyy HH:mm"
            ampm={false}
            value={selectedEndDate}
            onChange={handleEndDateChange}
            onClose={handleChangeRange}
          />
        </MuiPickersUtilsProvider>
        <RangeInput
          ordersByRange={ordersByRange}
          // width={800}
          // handleRangeChange={setRange}
          // range={range}
          // disabled={true}
          maxOrderId={maxOrderId}
        />
      </S.RangeWrapper>
    </>
  );
};

export default OrdersRange;
