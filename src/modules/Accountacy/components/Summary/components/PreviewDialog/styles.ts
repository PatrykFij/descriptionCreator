import styled from 'styled-components';

export const PrintOrderTable = styled.table`
  && {
    border-collapse: collapse;
    font-size: 11px !important;
  }

  & th,
  td {
    border: 1px solid black;
  }
  & td {
    white-space: nowrap;
  }

  p {
    margin: 0;
  }
`;

export const PrintSummarizeTable = styled.table`
  && {
    margin-top: 20px;
    float: right;
    width: 40%;
    border-collapse: collapse;
    font-size: 15px !important;
  }

  & th,
  td {
    border-bottom: 1px dotted black;
  }

  p {
    margin: 0;
  }
`;
