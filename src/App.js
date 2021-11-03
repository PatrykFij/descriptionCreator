import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Snackbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import { AppProvider } from "../src/components/AppContext/AppContext";
import { Form } from "./components/Form/Form";
import { Preview } from "./components/Preview/Preview";
import { SourceCodeDialog } from "./components/SourceCodeDialog/SourceCodeDialog";
import routes from "./routes/routes";
import { offerValidator } from "./utils/offerValidator";
import { MainWrapper, StyledButton } from "./App.css.js";
import "./App.scss";

const StyledAlertSnackbar = styled(Snackbar)`
  .MuiSnackbarContent-root {
    background-color: #f44336;
  }
`;

const App = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSourceCodeDialogOpen, setIsSourceCodeDialogOpen] = useState(false);
  const [isOfferValidatorAlertOpen, setIsOfferValidatorAlertOpen] = useState(false);

  const handleCopyDescriptionCode = () => {
    const isValidOffer = offerValidator.validAltTags();
    if (isValidOffer) {
      var previewCode = document
        .getElementById("preview")
        .innerHTML.replaceAll('src="https://www.brillar-sklep.pl', 'src="');
      navigator.clipboard.writeText(previewCode);
      setIsSnackbarOpen(true);
    } else {
      setIsOfferValidatorAlertOpen(true);
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("descriptionValues");
    window.location.reload();
  };

  const handleOpenSourceCodeDialog = () => {
    setIsSourceCodeDialogOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackbarOpen(false);
    setIsOfferValidatorAlertOpen(false);
  };

  return (
    <BrowserRouter>
      <AppProvider>
        {routes}
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
            <StyledAlertSnackbar
              severity="error"
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={2000}
              open={isOfferValidatorAlertOpen}
              onClose={handleClose}
              message="Nie wprowadzono ALT tagów dla wszystkich zdjęć!"
            />
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
    </BrowserRouter>
  );
};

export default App;
