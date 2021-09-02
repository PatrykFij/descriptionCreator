import "./App.scss";
import { useState } from "react";
import { Typography, Snackbar } from "@material-ui/core";
import { MainWrapper, StyledButton } from "./App.css.js";
import { Form } from "./components/Form/Form";
import { Preview } from "./components/Preview/Preview";
import { SourceCodeDialog } from "./components/SourceCodeDialog/SourceCodeDialog";
import { AppProvider } from "../src/components/AppContext/AppContext";

const App = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSourceCodeDialogOpen, setIsSourceCodeDialogOpen] = useState(false);

  const handleCopyDescriptionCode = () => {
    var previewCode = document.getElementById("preview").innerHTML;
    navigator.clipboard.writeText(previewCode);
    setIsSnackbarOpen(true);
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("descriptionValues");
  };

  const handleOpenSourceCodeDialog = () => {
    setIsSourceCodeDialogOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
  };

  return (
    <AppProvider>
      <div className="App">
        <Typography align="center" variant="h1" component="h2">
          Creator opisów Brillar
        </Typography>
        <StyledButton onClick={handleCopyDescriptionCode} variant="contained" color="primary">
          Kopiuj kod źródłowy opisu
        </StyledButton>
        <StyledButton onClick={handleClearLocalStorage} variant="contained" color="secondary">
          Wyczyść pamięć podręczną
        </StyledButton>
        <StyledButton onClick={handleOpenSourceCodeDialog} variant="contained" color="default">
          Wprowadź istniejącą ofertę
        </StyledButton>
        <SourceCodeDialog isOpen={isSourceCodeDialogOpen} setIsOpen={setIsSourceCodeDialogOpen} />
        <MainWrapper>
          <Form />
          <Preview />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isSnackbarOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Skopiowano"
          />
        </MainWrapper>
      </div>
    </AppProvider>
  );
};

export default App;
