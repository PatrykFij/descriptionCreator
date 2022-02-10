import { Button, Snackbar } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { mediaQuery } from 'constants/MediaQueries';
import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  margin: 30px;
  justify-content: center;
  ${mediaQuery.XL} {
    flex-wrap: wrap;
  }

  ${mediaQuery.SM} {
    margin: 0;
  }
`;

export const CustomButton = styled(Button)`
  height: auto;
  width: 10%;
  align-self: center;
  margin-left: 40px;
  max-width: 200px;
`;

export const StyledOfferSelect = styled(Autocomplete)`
  min-height: 60px;
  width: 50%;
  margin: 20px 50px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AlertSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: #f44336;
  }
`;
