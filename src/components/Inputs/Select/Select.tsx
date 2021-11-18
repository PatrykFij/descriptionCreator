import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

interface SelectOption {
  label: string;
  value: number;
}

interface Props {
  options: SelectOption[];
  value?: number;
  setValue: Dispatch<SetStateAction<number | undefined>>;
  width?: number;
}

const SelectInput = ({ value = 0, setValue, options, width = 100 }: Props) => {
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ width: width }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          {options.map(({ value, label }) => (
            <MenuItem value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
