import { Card, fade } from '@material-ui/core';
import styled from 'styled-components';
import theme from 'theme/theme';

export const Header = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
`;

export const CardWrapper = styled(Card)<{ withoutpadding?: string }>`
  position: relative;
  height: 100%;
  .MuiCardContent-root {
    padding: ${({ withoutpadding }) => withoutpadding === 'true' && 'unset'};
  }
  .MuiCardContent-root:last-child {
    padding: ${({ withoutpadding }) => withoutpadding === 'true' && 'unset'};
  }
`;

export const PreloaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${fade(theme.palette.background.paper, 0.7)};
  z-index: 99;
  display: grid;
  place-items: center;
`;
