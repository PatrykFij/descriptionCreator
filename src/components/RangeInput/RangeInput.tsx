import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Slider } from '@material-ui/core';
import * as S from './styles';

interface Props {
  width: number;
  handleRangeChange: Dispatch<SetStateAction<number[] | undefined>>;
  range: number[];
  disabled: boolean;
}

const RangeInput = ({ width, handleRangeChange, range, disabled }: Props) => {
  const [value, setValue] = useState<number[]>(range);

  useEffect(() => {
    setValue(range);
  }, [range]);

  const handleChange = useCallback(
    (event: ChangeEvent<{}>, newValue: number | number[]) => {
      setValue(newValue as number[]);
    },
    [],
  );
  const onChangeCommitted = useCallback(
    (event: ChangeEvent<{}>, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        handleRangeChange([newValue, newValue]);
      } else {
        handleRangeChange(newValue);
      }
    },
    [handleRangeChange],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const max = useMemo(() => range?.[1], []);

  return (
    <S.RangeInputWrapper sx={{ width }}>
      <S.Title>Zakres zamówień</S.Title>
      <Slider
        value={value}
        defaultValue={range}
        onChange={handleChange}
        onChangeCommitted={onChangeCommitted}
        valueLabelDisplay={'on'}
        max={max}
        min={0}
        disabled={disabled}
      />
    </S.RangeInputWrapper>
  );
};

export default RangeInput;
