import { useCallback, useState } from 'react';

type UseToggle = [boolean, () => void, () => void];

export const useToggle = (): UseToggle => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return [open, handleClickOpen, handleClose];
};
