import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import pl from 'date-fns/locale/pl';
import { Moment } from 'moment';

interface Props {
  dateRange: Moment[];
  setDateRange: Dispatch<SetStateAction<Moment[]>>;
}

const OrdersRange = ({ dateRange, setDateRange }: Props) => {
  const [selectedStartDate, handleStartDateChange] = useState<any>(
    dateRange[0],
  );
  const [selectedEndDate, handleEndDateChange] = useState<any>(dateRange[1]);

  const handleChangeRange = useCallback(() => {
    setDateRange([selectedStartDate, selectedEndDate]);
  }, [selectedEndDate, selectedStartDate, setDateRange]);

  return (
    <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
      <DateTimePicker
        variant="inline"
        label="Początkowa data"
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        value={selectedStartDate}
        onChange={handleStartDateChange}
        onClose={handleChangeRange}
      />
      <DateTimePicker
        variant="inline"
        label="Koncowa data"
        format="dd/MM/yyyy HH:mm"
        ampm={false}
        value={selectedEndDate}
        onChange={handleEndDateChange}
        onClose={handleChangeRange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default OrdersRange;
