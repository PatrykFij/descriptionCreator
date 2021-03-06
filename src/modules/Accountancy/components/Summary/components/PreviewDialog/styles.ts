import styled from 'styled-components';

export const OrdersTableWrapper = styled.div`
  table {
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

export const PreviewSummarize = styled.div`
  && {
    margin-top: 20px;
    float: right;
    width: 60%;
    font-size: 15px !important;
    white-space: nowrap;

    & > div > div {
      padding: 1px;
    }

    & > div > div:last-child {
      min-width: unset;
    }
  }
`;
