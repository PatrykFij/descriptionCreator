import "./App.css";
import { Typography } from "@material-ui/core";
import { MainWrapper, PreviewWrapper, FormWrapper, StyledTextField } from "./App.css.js";

function App() {
  return (
    <div className="App">
      <Typography align="center" variant="h1" component="h2">
        Creator opisów Brillar
      </Typography>
      <MainWrapper>
        <FormWrapper>
          <StyledTextField label="Producent nagłówek H4" variant="outlined" />
          <StyledTextField label="Nagłówek H2" variant="outlined" />
          <StyledTextField label="Nagłówek H3" variant="outlined" />
          <StyledTextField label="Nagłówek H4" variant="outlined" />
          <StyledTextField label="Opis akapin nr 1" variant="outlined" />
          <StyledTextField label="Opis akapin nr 1" variant="outlined" />
        </FormWrapper>
        <PreviewWrapper>
          <div>
            <h4>KEMON</h4>
            <div>
              <div>
                <h2>ZESTAW DO WŁOSÓW PRZESUSZONYCH</h2>
                <h3>ODŻYWIENIE SUCHYCH WŁOSÓW</h3>
                <h4>Szampon 250ml, Odżywka 150ml, Krem 150ml</h4>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Zestaw Kemon Actyva Nutrizione to pielęgnacja przeznaczona do włosów średnich i cienkich, lekko
                  przesuszonych, wrażliwych oraz normalnej skóry głowy. Szampon, odżywka oraz krem zapewniają optymalne
                  i natychmiastowe odżywienie, zachowując naturalną równowagę skóry głowy. Nawilżają i chronią włosy.
                  Dodają włosom blasku, miękkości, lekkiej objętości, ułatwiają rozczesywanie oraz trwale chronią przed
                  przesuszeniem.
                </p>
                <p>
                  Włosy suche charakteryzują się częściową lub całkowitą utratą lipidów lub odwodnieniem. Pozbawione
                  naturalnych substancji łuski zewnętrznej warstwy włosów otwierają się. W efekcie włosy stają się
                  matowe, szorstkie, kruche, elektryzują się, są trudne do rozczesania i ułożenia oraz brakuje im
                  elastyczności. Włosy mogą być z natury suche lub ulec wysuszeniu pod wpływem czynników zewnętrznych
                  lub nawyków danej osoby. Z myślą o pielęgnacji włosów suchych Kemon Actyva proponuje linię Nutrizione
                  z zaawansowaną technologicznie mieszanką surowców oraz składników aktywnych pochodzenia naturalnego,
                  która wszystkim rodzajom włosów przywraca naturalny stan równowagi.
                </p>
              </div>
              <div>
                <ul>
                  <li>DELIKATNIE OCZYSZCZA WŁOSY I SKÓRĘ GŁOWY</li>
                  <li>NAWILŻA I CHRONI WŁOSY</li>
                  <li>ODŻYWIA</li>
                  <li>POMAGA ZACHOWAĆ NATURALNĄ RÓWNOWAGĘ SKÓRY GŁOWY</li>
                  <li>UŁATWIA ROZCZESYWANIE</li>
                  <li>DODAJE BLASKU, MIĘKKOŚCI I LEKKOŚCI</li>
                </ul>
              </div>
            </div>
            <div class="neat-section neat-section-kv-banner">
              <img
                src="https://friser.pl/userdata/public/assets/kategorie/kemon/kemon-actyva-nutrizione-kosmetyki-do-wlosow-suchych.jpg"
                alt="Kemon Actyva Nutrizione kosmetyki do włosów suchych"
                width="auto"
              />
            </div>
          </div>
        </PreviewWrapper>
      </MainWrapper>
    </div>
  );
}

export default App;
