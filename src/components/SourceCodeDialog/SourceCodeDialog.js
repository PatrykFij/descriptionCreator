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
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Kod źródłowy shoper</DialogTitle>
      <DialogContent>
        <DialogContentText>Wprowadź kod źródłowy istniejącej oferty shoper, aby rozpocząć edycje.</DialogContentText>
        <TextField autoFocus margin="dense" label="Kod żródłowy" multiline rows={10} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Zamknij
        </Button>
        <Button onClick={handleClose} color="primary">
          Zatwierdź
        </Button>
      </DialogActions>
    </Dialog>
  );
};
