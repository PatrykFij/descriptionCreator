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
  }
`;
