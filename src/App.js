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

  const [firstParagraph, setFirstParagraph] = useState(
    "Zestaw Kemon Actyva Nutrizione to pielęgnacja przeznaczona do włosów średnich i cienkich, lekko przesuszonych, wrażliwych oraz normalnej skóry głowy. Szampon, odżywka oraz krem zapewniają optymalne i natychmiastowe odżywienie, zachowując naturalną równowagę skóry głowy. Nawilżają i chronią włosy. Dodają włosom blasku, miękkości, lekkiej objętości, ułatwiają rozczesywanie oraz trwale chronią przed przesuszeniem."
  );
  const [secondParagraph, setSecondParagraph] = useState(
    "Włosy suche charakteryzują się częściową lub całkowitą utratą lipidów lub odwodnieniem. Pozbawione naturalnych substancji łuski zewnętrznej warstwy włosów otwierają się. W efekcie włosy stają się matowe, szorstkie, kruche, elektryzują się, są trudne do rozczesania i ułożenia oraz brakuje im elastyczności. Włosy mogą być z natury suche lub ulec wysuszeniu pod wpływem czynników zewnętrznych lub nawyków danej osoby. Z myślą o pielęgnacji włosów suchych Kemon Actyva proponuje linię Nutrizione z zaawansowaną technologicznie mieszanką surowców oraz składników aktywnych pochodzenia naturalnego, która wszystkim rodzajom włosów przywraca naturalny stan równowagi."
  );

  const [enabledListSection, setEnabledListSection] = useState(false);
  const [listItems, setListItems] = useState([
    "DELIKATNIE OCZYSZCZA WŁOSY I SKÓRĘ GŁOWY",
    "NAWILŻA I CHRONI WŁOSY",
    "ODŻYWIA",
    "POMAGA ZACHOWAĆ NATURALNĄ RÓWNOWAGĘ SKÓRY GŁOWY",
    "UŁATWIA ROZCZESYWANIE",
    "DODAJE BLASKU, MIĘKKOŚCI I LEKKOŚCI",
  ]);

  const [enabledBannerSection, setEnabledBannerSection] = useState(false);
  const [bannerLink, setBannerLink] = useState(
    "https://www.brillar-sklep.pl/userdata/public/assets/kemon/kemon-actyva-nutrizione-kosmetyki-do-wlosow-suchych.jpg"
  );

  const [enabledPicturesSection, setEnabledPicturesSection] = useState(false);

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
          setFirstParagraph={setFirstParagraph}
          setSecondParagraph={setSecondParagraph}
          enabledListSection={enabledListSection}
          setEnabledListSection={setEnabledListSection}
          setListItems={setListItems}
          enabledBannerSection={enabledBannerSection}
          setEnabledBannerSection={setEnabledBannerSection}
          setBannerLink={setBannerLink}
        />
        <StyledButton onClick={handleCopyDescriptionCode} variant="contained" color="primary">
          Kopiuj kod źródłowy opisu
        </StyledButton>
        <Preview
          producer={producer}
          topHeader={topHeader}
          middleHeader={middleHeader}
          bottomHeader={bottomHeader}
          firstParagraph={firstParagraph}
          secondParagraph={secondParagraph}
          enabledListSection={enabledListSection}
          listItems={listItems}
          bannerLink={bannerLink}
          enabledBannerSection={enabledBannerSection}
        />
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
