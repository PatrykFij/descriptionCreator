import "../../App.css";
import styled from "styled-components";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  max-height: 100vh;
  overflow-y: scroll;
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
  enabledPicturesSection,
  pictureItems,
  pictureSectionTitle,
}) => {
  return (
    <PreviewWrapper id="preview">
      <div class="description-container">
        <div class="top-bar"></div>
        {producer && <h4 class="producer-header">{producer}</h4>}
        {(topHeader || middleHeader || bottomHeader) && (
          <div class="top-headers-section">
            {topHeader && <h2>{topHeader}</h2>}
            {middleHeader && <h3>{middleHeader}</h3>}
            {bottomHeader && <h4>{bottomHeader}</h4>}
          </div>
        )}
        <div>
          <div class="description-section">
            {firstParagraph && <p>{firstParagraph}</p>}
            {secondParagraph && <p>{secondParagraph}</p>}
          </div>
          {enabledListSection && listItems.length > 0 && (
            <div class="list-section">
              <ul class="list">{listItems.map((el) => (el ? <li>{el}</li> : null))}</ul>
            </div>
          )}
        </div>
        {enabledBannerSection && (
          <div class="banner-section">
            {bannerLink && <img src={bannerLink} alt="USTAWIĆ ALT TAK NA PODSTAWIE NAZWY PLIKU !!!" width="auto" />}
          </div>
        )}
        {enabledPicturesSection && (
          <>
            {pictureSectionTitle && <h4>{pictureSectionTitle}</h4>}
            <div class="image-section">
              {pictureItems.map((el) => (
                <div class="image-container">
                  <img src={el.url} alt="USTAWIĆ ALT TAK NA PODSTAWIE NAZWY PLIKU !!!" width="auto" />
                  <h5>{el.title}</h5>
                  <span>{el.description}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PreviewWrapper>
  );
};
