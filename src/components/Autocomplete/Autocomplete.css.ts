import { Autocomplete } from '@mui/material';
import styled from 'styled-components';

export const StyledOfferSelect = styled(Autocomplete)`
  min-height: 60px;
  min-width: 70%;
  margin: 20px 50px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    font-size: 30px;
  }
`;
