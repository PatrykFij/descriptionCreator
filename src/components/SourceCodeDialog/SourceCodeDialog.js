import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";

export const SourceCodeDialog = ({ isOpen, setIsOpen }) => {
  const [sourceCode, setSourceCode] = useState();

  const handleClose = () => {
    setSourceCode();
    setIsOpen(false);
  };

  const handleApprove = () => {
    setSourceCode();
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setSourceCode(e.target.value.trim());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kod źródłowy shoper</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Wprowadź kod źródłowy istniejącej oferty shoper i zawtwierdź, aby rozpocząć edycje.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Kod żródłowy"
          multiline
          rows={10}
          value={sourceCode}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Zamknij
        </Button>
        <Button onClick={handleApprove} color="primary">
          Zatwierdź
        </Button>
      </DialogActions>
    </Dialog>
  );
};
