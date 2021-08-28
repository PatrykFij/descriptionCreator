import "./App.scss";
import { useState } from "react";
import { Typography, Snackbar } from "@material-ui/core";
import { MainWrapper, StyledButton } from "./App.css.js";
import { Form } from "./components/Form/Form";
import { Preview } from "./components/Preview/Preview";
import { Mock } from "./constants/Mock";
import { AppProvider } from "../src/components/AppContext/AppContext";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleCopyDescriptionCode = () => {
    var previewCode = document.getElementById("preview").innerHTML;
    navigator.clipboard.writeText(previewCode);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <AppProvider>
      <div className="App">
        <Typography align="center" variant="h1" component="h2">
          Creator opisów Brillar
        </Typography>
        <MainWrapper>
          <Form />
          <StyledButton onClick={handleCopyDescriptionCode} variant="contained" color="primary">
            Kopiuj kod źródłowy opisu
          </StyledButton>
          <Preview />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={open}
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
