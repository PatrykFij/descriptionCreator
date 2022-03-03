import { Button, IconButton, Snackbar } from '@material-ui/core';
import { Autocomplete, Grid } from '@mui/material';
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

export const ToolBar = styled(Grid)`
  padding: 35px 30px 0 30px;

  & div.MuiGrid-root button {
    height: 100%;
    font-size: 20px;
  }
  & div:last-child .MuiGrid-root svg {
    width: 3em;
    height: 3em;
  }
`;

export const CustomButton = styled(Button)`
  height: auto;
  align-self: center;
  margin-left: 40px;
  max-width: 200px;

  & .MuiButton-label {
    font-size: 20px;
  }
`;
export const GoToOfferIcon = styled(IconButton)`
  margin-left: 40px;
`;

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

export const AlertSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: #f44336;
  }
`;
