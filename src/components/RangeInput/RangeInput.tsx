import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { Slider } from '@material-ui/core';
import * as S from './styles';

interface Props {
  width: number;
  handleRangeChange: Dispatch<SetStateAction<number[] | undefined>>;
  ordersRange: number[];
  disabled: boolean;
}

const RangeInput = ({
  width,
  handleRangeChange,
  ordersRange,
  disabled,
}: Props) => {
  const [value, setValue] = useState<number[]>(ordersRange);

  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: number | number[],
  ) => {
    setValue(newValue as number[]);
  };

  const onChangeCommitted = (
    event: ChangeEvent<{}>,
    newValue: number | number[],
  ) => {
    if (typeof newValue === 'number') {
      handleRangeChange([newValue, newValue]);
    } else {
      handleRangeChange(newValue);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const min = useMemo(() => ordersRange?.[0], []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const max = useMemo(() => ordersRange?.[1], []);

  return (
    <S.RangeInputWrapper sx={{ width }}>
      <S.Title>Zakres zamówień</S.Title>
      <Slider
        value={value}
        defaultValue={ordersRange}
        onChange={handleChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay={'on'}
        max={max}
        min={min}
        disabled={disabled}
      />
    </S.RangeInputWrapper>
  );
};

export default RangeInput;
