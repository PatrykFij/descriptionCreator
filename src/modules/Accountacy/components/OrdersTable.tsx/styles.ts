import { Table, TableBody } from '@material-ui/core';
import styled from 'styled-components';

export const Product = styled.p`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const OrdersTable = styled(Table)`
  td:nth-child(2) {
    white-space: nowrap;
  }
  width: 100%;
`;
export const OrdersList = styled(TableBody)`
  && {
    max-height: 50vh;
  }
`;
export const TableWrapper = styled.div`
  && {
    overflow-y: scroll;
    padding-top: 0;
    max-height: 50vh;
    min-height: 40vh;
  }
`;
export const LoadingWrapper = styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
  }
`;

export const NoDataWrapper = styled.div`
  && {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    height: 250px;
  }
`;

export const UpdateButtonWrapper = styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  p {
    margin: 2px;
    text-align: center;
  }

  p:first-child {
    margin-top: 5px;
  }
  p:last-child {
    font-weight: 500;
  }
`;
