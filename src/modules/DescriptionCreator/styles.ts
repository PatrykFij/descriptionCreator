import { Button, IconButton, Snackbar } from '@material-ui/core';
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

export const ToolBar = styled.div`
  display: flex;
  margin: 30px;
  width: 80%;
  justify-content: space-between;
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

  & svg {
    width: 3em;
    height: 3em;
  }
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
