import { useContext, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import styled from 'styled-components';
import { AppContext } from '../../../context/AppContext/AppContext';
import * as api from '../api';

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
  const { producers, getProducers } = api.useGetProducers();

  useEffect(() => getProducers(), [getProducers]);

  return (
    <StyledFormControl>
      <InputLabel>Producent</InputLabel>
      <Select value={producer} onChange={handleChange}>
        {producers &&
          producers.map(({ producer_id, name }) => (
            <MenuItem key={producer_id} value={name.toLocaleLowerCase()}>
              {name}
            </MenuItem>
          ))}
      </Select>
    </StyledFormControl>
  );
};
