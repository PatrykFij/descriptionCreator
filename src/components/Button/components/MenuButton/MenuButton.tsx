import { MouseEvent, ReactNode, useRef, useState } from 'react';
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
} from '@material-ui/core';
import * as S from './styles';

interface Props {
  children?: ReactNode;
  icon: ReactNode;
  transformX?: number;
}

const MenuButton = ({ icon, transformX = 0, children }: Props) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent<EventTarget>) => {
    if (
      anchorRef?.current &&
      anchorRef?.current?.contains(event?.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton ref={anchorRef} aria-haspopup="true" onClick={handleToggle}>
        {icon}
      </IconButton>
      <S.PopperZIndex
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'center top',
            }}
          >
            <S.MenuPaper transformx={transformX}>
              <ClickAwayListener onClickAway={handleClose}>
                <S.MenuListNoPadding autoFocusItem={open} id="menu-list-grow">
                  {Array.isArray(children) ? (
                    children.map((child, i) => (
                      <MenuItem key={`menu-item-${i}`} onClick={handleClose}>
                        {child}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem onClick={handleClose}>
                      {children || <S.NoItems>No items</S.NoItems>}
                    </MenuItem>
                  )}
                </S.MenuListNoPadding>
              </ClickAwayListener>
            </S.MenuPaper>
          </Grow>
        )}
      </S.PopperZIndex>
    </>
  );
};

export default MenuButton;
