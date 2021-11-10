import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { Slider } from '@material-ui/core';
import * as S from './styles';

interface Props {
  width: number;
  handleRangeChange: Dispatch<SetStateAction<number[]>>;
  max: number;
  min: number;
  defaultRange: number[];
}

const RangeInput = ({ width, handleRangeChange, max, min }: Props) => {
  const [value, setValue] = useState<number[]>([min, max]);

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

  return (
    <S.RangeInputWrapper sx={{ width }}>
      <S.Title>Zakres zamówień</S.Title>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay="on"
        max={max}
        min={min}
      />
    </S.RangeInputWrapper>
  );
};

export default RangeInput;
