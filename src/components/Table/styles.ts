import { MTableCell } from 'material-table';
import styled from 'styled-components';

export const TableRow = styled(MTableCell)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &&:first-of-type {
    padding-left: 1rem;
  }
  &&:last-of-type {
    padding-right: 1rem;
  }
`;
