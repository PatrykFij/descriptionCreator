import styled from "styled-components";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  min-width: 1180px;
  max-width: 1180px;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export const Preview = ({
  producer,
  topHeader,
  middleHeader,
  bottomHeader,
  firstParagraph,
  secondParagraph,
  enabledListSection,
  listItems,
  bannerLink,
  enabledBannerSection,
}) => {
  return (
    <PreviewWrapper id="preview">
      <div>
        {producer && <h4>{producer}</h4>}
        {(topHeader || middleHeader || bottomHeader) && (
          <div>
            <div>
              {topHeader && <h2>{topHeader}</h2>}
              {middleHeader && <h3>{middleHeader}</h3>}
              {bottomHeader && <h4>{bottomHeader}</h4>}
            </div>
          </div>
        )}
        <div>
          <div>
            {firstParagraph && <p>{firstParagraph}</p>}
            {secondParagraph && <p>{secondParagraph}</p>}
          </div>
          <div>{enabledListSection && <ul>{listItems.map((el) => (el ? <li>{el}</li> : null))}</ul>}</div>
        </div>
        {enabledBannerSection && (
          <div class="neat-section neat-section-kv-banner">
            {bannerLink && <img src={bannerLink} alt="USTAWIĆ ALT TAK NA PODSTAWIE NAZWY PLIKU !!!" width="auto" />}
          </div>
        )}
      </div>
    </PreviewWrapper>
  );
};
