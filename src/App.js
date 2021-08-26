import "./App.css";
import { useState } from "react";
import { Typography, Snackbar } from "@material-ui/core";
import { MainWrapper, StyledButton } from "./App.css.js";
import { Form } from "./components/Form/Form";
import { Preview } from "./components/Preview/Preview";

const App = () => {
  const [open, setOpen] = useState(false);
  const [producer, setProducer] = useState("KEMON");
  const [topHeader, setTopHeader] = useState("ZESTAW DO WŁOSÓW PRZESUSZONYCH");
  const [middleHeader, setMiddleHeader] = useState("ODŻYWIENIE SUCHYCH WŁOSÓW");
  const [bottomHeader, setBottomHeader] = useState("Szampon 250ml, Odżywka 150ml, Krem 150ml");

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
    <div className="App">
      <Typography align="center" variant="h1" component="h2">
        Creator opisów Brillar
      </Typography>
      <MainWrapper>
        <Form
          setProducer={setProducer}
          setTopHeader={setTopHeader}
          setMiddleHeader={setMiddleHeader}
          setBottomHeader={setBottomHeader}
        />
        <StyledButton onClick={handleCopyDescriptionCode} variant="contained" color="primary">
          Kopiuj kod źródłowy opisu
        </StyledButton>
        <Preview producer={producer} topHeader={topHeader} middleHeader={middleHeader} bottomHeader={bottomHeader} />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Skopiowano"
        />
      </MainWrapper>
    </div>
  );
};

export default App;
