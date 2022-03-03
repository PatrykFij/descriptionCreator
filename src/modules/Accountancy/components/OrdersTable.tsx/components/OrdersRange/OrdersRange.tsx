import { Dispatch, SetStateAction } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import pl from 'date-fns/locale/pl';
import moment, { Moment } from 'moment';
import RangeInput from 'components/RangeInput';
import { MappedOrder } from 'utils/mappers/types';
import * as S from './styles';

interface Props {
  startDate: Moment;
  setStartDate: Dispatch<SetStateAction<Moment>>;
  endDate: Moment;
  setEndDate: Dispatch<SetStateAction<Moment>>;
  ordersByRange?: MappedOrder[];
  maxOrderId: number;
}

const OrdersRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  ordersByRange,
  maxOrderId,
}: Props) => {
  const handleChangeStartDate = (date: any) => {
    setStartDate(moment(date));
  };

  const handleChangeEndDate = (date: any) => {
    setEndDate(moment(date));
  };

  return (
    <S.RangeWrapper>
      <MuiPickersUtilsProvider locale={pl} utils={DateFnsUtils}>
        <DateTimePicker
          label="Początkowa data"
          format="yyyy-MM-dd HH:mm"
          ampm={false}
          value={startDate}
          onChange={handleChangeStartDate}
        />
        <S.Title>Zakres zamówień</S.Title>
        <DateTimePicker
          label="Koncowa data"
          format="yyyy-MM-dd HH:mm"
          ampm={false}
          value={endDate}
          onChange={handleChangeEndDate}
        />
      </MuiPickersUtilsProvider>
      <RangeInput ordersByRange={ordersByRange} maxOrderId={maxOrderId} />
    </S.RangeWrapper>
  );
};

export default OrdersRange;
