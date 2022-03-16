import { useContext, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import styled from 'styled-components';
import * as api from '../../../api/api';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledFormControl = styled(FormControl)`
  display: block;

  .MuiSelect-root {
    min-width: 300px;
  }
`;

export const ProducerSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const { producers, getProducers } = api.useGetProducers();

  useEffect(() => {
    getProducers();
  }, [getProducers]);

  const handleChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      producer: event.target.value,
      producerLogo: producers?.filter(el => el.name.toLocaleLowerCase() === event.target.value)[0].gfx
    }));
  };

  return (
    <StyledFormControl>
      <InputLabel>Producent</InputLabel>
      <Select
        value={productOfferDescription?.producer || ''}
        onChange={handleChange}
      >
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
