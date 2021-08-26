import styled from "styled-components";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  width: 100%;
  margin: 10px;
  padding: 10px;
`;

export const Preview = ({ producer, topHeader, middleHeader, bottomHeader }) => {
  return (
    <PreviewWrapper id="preview">
      <div>
        {producer && <h4>{producer}</h4>}
        <div>
          <div>
            {topHeader && <h2>{topHeader}</h2>}
            {middleHeader && <h3>{middleHeader}</h3>}
            {bottomHeader && <h4>{bottomHeader}</h4>}
          </div>
        </div>
        <div>
          <div>
            <p>
              Zestaw Kemon Actyva Nutrizione to pielęgnacja przeznaczona do włosów średnich i cienkich, lekko
              przesuszonych, wrażliwych oraz normalnej skóry głowy. Szampon, odżywka oraz krem zapewniają optymalne i
              natychmiastowe odżywienie, zachowując naturalną równowagę skóry głowy. Nawilżają i chronią włosy. Dodają
              włosom blasku, miękkości, lekkiej objętości, ułatwiają rozczesywanie oraz trwale chronią przed
              przesuszeniem.
            </p>
            <p>
              Włosy suche charakteryzują się częściową lub całkowitą utratą lipidów lub odwodnieniem. Pozbawione
              naturalnych substancji łuski zewnętrznej warstwy włosów otwierają się. W efekcie włosy stają się matowe,
              szorstkie, kruche, elektryzują się, są trudne do rozczesania i ułożenia oraz brakuje im elastyczności.
              Włosy mogą być z natury suche lub ulec wysuszeniu pod wpływem czynników zewnętrznych lub nawyków danej
              osoby. Z myślą o pielęgnacji włosów suchych Kemon Actyva proponuje linię Nutrizione z zaawansowaną
              technologicznie mieszanką surowców oraz składników aktywnych pochodzenia naturalnego, która wszystkim
              rodzajom włosów przywraca naturalny stan równowagi.
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
  );
};
