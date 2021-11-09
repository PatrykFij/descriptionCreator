import styled from 'styled-components';
import theme, { MARGIN } from 'theme/theme';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  & > * {
    width: 100%;
    max-width: ${`${theme.breakpoints.values.xl - 2 * MARGIN}px`};
  }
`;
