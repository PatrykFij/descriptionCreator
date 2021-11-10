import { MenuList, Paper, Popper } from '@material-ui/core';
import styled from 'styled-components';
import theme from 'theme/theme';

export const NoItems = styled.p`
  color: ${theme.palette.text.secondary};
  margin: 0;
  padding: 0.5rem;
`;

export const PopperZIndex = styled(Popper)`
  && {
    z-index: 999;
  }
`;

export const MenuListNoPadding = styled(MenuList)`
  & > li {
    &:hover {
      background-color: white;
    }
    padding: 0;
  }
`;

export const MenuPaper = styled(Paper)<{ transformx?: number }>`
  transform: ${(props) => `translateX(${props.transformx}px) !important`};
`;
