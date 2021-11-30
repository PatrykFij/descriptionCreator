import { useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';
import { mapOrdersRange } from 'utils/mappers/mapOrdersRange';
import { MappedOrder } from 'utils/mappers/types';
import * as S from './styles';

interface Props {
  // width: number;
  // handleRangeChange: Dispatch<SetStateAction<number[] | undefined>>;
  // range: number[];
  // disabled: boolean;
  maxOrderId: number;
  ordersByRange?: MappedOrder[];
}

const RangeInput = ({
  ordersByRange,
  maxOrderId,
}: // width,
// handleRangeChange,
// range,
// disabled,
Props) => {
  const [value, setValue] = useState<number[]>([50, 100]);

  useEffect(() => {
    if (ordersByRange) {
      const orderRange = mapOrdersRange(ordersByRange);
      setValue(orderRange);
    }
  }, [ordersByRange]);

  // const handleChange = useCallback(
  //   (event: ChangeEvent<{}>, newValue: number | number[]) => {
  //     setValue(newValue as number[]);
  //   },
  //   [],
  // );
  // const onChangeCommitted = useCallback(
  //   (event: ChangeEvent<{}>, newValue: number | number[]) => {
  //     if (typeof newValue === 'number') {
  //       handleRangeChange([newValue, newValue]);
  //     } else {
  //       handleRangeChange(newValue);
  //     }
  //   },
  //   [],
  // );

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const max = useMemo(() => range?.[1], []);

  return (
    <S.RangeInputWrapper>
      <Slider
        value={value}
        // defaultValue={range}
        // onChange={handleChange}
        // onChangeCommitted={onChangeCommitted}
        valueLabelDisplay={'on'}
        max={maxOrderId}
        min={0}
        disabled={true}
      />
    </S.RangeInputWrapper>
  );
};

export default RangeInput;
