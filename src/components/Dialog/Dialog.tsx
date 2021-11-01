import { ReactElement, ReactNode } from "react";
import { Box, CircularProgress, Dialog as MDialog, DialogContent, DialogTitle, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import * as S from "./styles";

interface Props {
  title: string;
  children: ReactNode;
  loading?: boolean;
  onClose: () => void;
  dialogActions: ReactElement;
  subheader?: ReactElement;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}
const Dialog = ({ title, children, loading = false, onClose, dialogActions, subheader, maxWidth }: Props) => {
  return (
    <MDialog open fullWidth maxWidth={maxWidth}>
      <>
        {loading ? (
          <Box m={2} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mr={1}>
              <DialogTitle>{title}</DialogTitle>
              <IconButton onClick={onClose} data-testid="close-button">
                <CloseIcon />
              </IconButton>
            </Box>
            {subheader && <DialogContent dividers>{subheader}</DialogContent>}
            <S.DialogContentWrapper>{children}</S.DialogContentWrapper>
            <S.DialogActions>{dialogActions}</S.DialogActions>
          </>
        )}
      </>
    </MDialog>
  );
};

export default Dialog;
