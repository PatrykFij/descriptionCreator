import styled from 'styled-components';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledFormControl = styled(FormControl)`
  display: block;

  .MuiSelect-root {
    min-width: 300px;
  }
`;

export const ProducerSection = () => {
  const { producer, setProducer } = useContext(AppContext);

  const handleChange = (event) => {
    setProducer(event.target.value);
  };

  return (
    <StyledFormControl>
      <InputLabel>Producent</InputLabel>
      <Select value={producer} onChange={handleChange}>
        <MenuItem value={'kemon'}>Kemon</MenuItem>
        <MenuItem value={'yonelle'}>Yonelle</MenuItem>
        <MenuItem value={'shangpree'}>Shangpree</MenuItem>
        <MenuItem value={'alfapar'}>Alfapar</MenuItem>
        <MenuItem value={'grazette'}>Grazette</MenuItem>
        <MenuItem value={'davines'}>Davines</MenuItem>
      </Select>
    </StyledFormControl>
  );
};
