import "../../App.scss";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: hidden;
  min-width: 1180px;
  max-width: 1180px;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export const Preview = () => {
  const {
    producer,
    topHeader,
    middleHeader,
    bottomHeader,
    paragraph,
    enabledListSection,
    listItems,
    bannerLink,
    enabledBannerSection,
    enabledPicturesSection,
    pictureItems,
    pictureSectionTitle,
  } = useContext(AppContext);

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
          <div class="description-section">{paragraph && <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>}</div>
          {enabledListSection && listItems.length > 0 && (
            <div class="list-section">
              <ul class="list">{listItems.map((el) => (el ? <li>{el}</li> : null))}</ul>
            </div>
          )}
        </div>
        {enabledBannerSection && (
          <div class="banner-section">
            {bannerLink && (
              <img
                src={"https://www.brillar-sklep.pl/userdata/public/assets/kemon/" + bannerLink}
                alt="USTAWIĆ ALT TAK NA PODSTAWIE NAZWY PLIKU !!!"
                width="auto"
              />
            )}
          </div>
        )}
        {enabledPicturesSection && (
          <>
            {pictureSectionTitle && <h4>{pictureSectionTitle}</h4>}
            <div class="image-section">
              {pictureItems.map((el, index) => (
                <div key={index} class="image-container">
                  <img
                    src={"https://www.brillar-sklep.pl/userdata/public/assets/kemon/" + el.url}
                    alt={el.alt}
                    width="auto"
                  />
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
