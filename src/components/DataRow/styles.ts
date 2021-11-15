import styled from 'styled-components';
import theme from 'theme/theme';

export const Row = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.palette.grey[200]};
  justify-content: space-between;
  width: 100%;
  &&:last-of-type {
    flex: 1;
    overflow: auto;
  }
`;

export const LeftSideParagraph = styled.div`
  padding: 0.5rem 0;
  color: ${theme.palette.text.secondary};
  text-transform: capitalize;
`;

export const RightSideParagraph = styled.div`
  padding: 0.5rem 0;
  margin-left: 0.5rem;
  text-align: right;
  color: ${theme.palette.text.primary};
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 25%;
  white-space: nowrap;
`;
