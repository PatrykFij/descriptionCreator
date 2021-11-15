import { Button, Snackbar } from '@material-ui/core';
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

export const AlertSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: #f44336;
  }
`;
