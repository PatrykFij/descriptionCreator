import styled from 'styled-components';

export const PrintOrderTable = styled.table`
  && {
    border-collapse: collapse;
    font-size: 11px !important;
    width: 100%;
  }

  & th,
  td {
    border: 1px solid black;
  }
  & td {
    white-space: nowrap;
  }

  td:nth-child(3),
  td:nth-child(4),
  td:nth-child(5),
  td:nth-child(6) {
    text-align: center;
  }

  td:last-child {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  p {
    margin: 0;
  }
`;

export const PrintSummarizeTable = styled.table`
  && {
    margin-top: 20px;
    float: right;
    width: 60%;
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
