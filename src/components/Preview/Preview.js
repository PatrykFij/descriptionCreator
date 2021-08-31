import "../../App.scss";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import { mediaQuery } from "../../constants/MediaQueries";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: hidden;
  min-width: 1180px;
  max-width: 1180px;
  margin: 10px;
  padding: 20px;
  box-sizing: border-box;

  ${mediaQuery.LG} {
    min-width: 940px;
    max-width: 940px;
    margin: 0;
    padding: 0;
  }

  ${mediaQuery.MD} {
    min-width: 700px;
    max-width: 700px;
  }

  ${mediaQuery.SM} {
    min-width: unset;
    max-width: unset;
    width: 100%;
    margin: 0;
  }
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
    enabledVideoSection,
    videoUrl,
  } = useContext(AppContext);

  return (
    <PreviewWrapper id="preview">
      <div class="description-container">
        <div class="top-bar"></div>
        {producer && <h4 class="section producer-header">{producer}</h4>}
        {(topHeader || middleHeader || bottomHeader) && (
          <div class="section headers-section">
            {topHeader && <h2>{topHeader}</h2>}
            {middleHeader && <h3>{middleHeader}</h3>}
            {bottomHeader && <h4>{bottomHeader}</h4>}
          </div>
        )}
        <div class="section description-section">
          {paragraph && <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>}
        </div>
        {enabledListSection && listItems.length > 0 && (
          <div class="section list-section">
            <ul class="list">{listItems.map((el) => (el ? <li>{el}</li> : null))}</ul>
          </div>
        )}
        {enabledBannerSection && (
          <div class="section banner-section">
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
            <div class="section image-section">
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
        {enabledVideoSection && (
          <>
            <div class="section video-section">
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/m0fIHkfqpfo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </>
        )}
      </div>
    </PreviewWrapper>
  );
};
