import "../../App.scss";
import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import { mediaQuery } from "../../constants/MediaQueries";

const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: scroll;
  min-width: 1180px;
  max-width: 1180px;
  max-height: 80vh;
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
    listSection,
    bannerSection,
    enabledBannerSection,
    enabledPicturesSection,
    pictureItems,
    pictureSectionTitle,
    enabledVideoSection,
    videoSection,
  } = useContext(AppContext);

  return (
    <PreviewWrapper id="preview">
      <div class="description-container">
        <div class="top-bar"></div>
        {producer && (
          <div id="producer-logo-section" class="producer-logo">
            <a data-id="a_1" href={`https://www.brillar-sklep.pl/` + producer}>
              <img
                src={"https://www.brillar-sklep.pl/userdata/public/assets/producer-" + producer + ".png"}
                alt="Logo producenta"
                width="auto"
              />
            </a>
          </div>
        )}
        {(topHeader || middleHeader || bottomHeader) && (
          <div id="headers-section" class="section headers-section">
            {topHeader && <h2 data-id="h2_1">{topHeader}</h2>}
            {middleHeader && <h3 data-id="h3_1">{middleHeader}</h3>}
            {bottomHeader && <h4 data-id="h4_1">{bottomHeader}</h4>}
          </div>
        )}
        <div id="description_section" class="section description-section">
          {paragraph && <p data-id="p_1" dangerouslySetInnerHTML={{ __html: paragraph }}></p>}
        </div>
        {enabledListSection && (listSection.title || listSection.listItems.length > 0) && (
          <div id="list_section" class="section list-section">
            {listSection.title && (
              <h4 data-id="h4_1" class="header">
                {listSection.title}
              </h4>
            )}
            <ul data-id="ul_1" class="list">
              {listSection.listItems.map((el) => (el ? <li>{el}</li> : null))}
            </ul>
          </div>
        )}
        {enabledBannerSection && bannerSection.imgFileName && (
          <div id="banner-section" class="section banner-section">
            <img
              data-id="img_1"
              class="img-frame"
              src={"https://www.brillar-sklep.pl/userdata/public/assets/" + bannerSection.imgFileName}
              alt={bannerSection.imgAltTag}
              width="auto"
            />
          </div>
        )}
        {enabledPicturesSection && (pictureSectionTitle || pictureItems.length > 0) && (
          <div id="pictures-section" class="section">
            {pictureSectionTitle && (
              <h4 data-id="h4_1" class="header">
                {pictureSectionTitle}
              </h4>
            )}
            {pictureItems.length > 0 && (
              <div id="pictures-wrapper" class="image-section">
                {pictureItems.map((el, index) => (
                  <div key={index} class="image-container">
                    <img
                      data-id="img_1"
                      src={"https://www.brillar-sklep.pl/userdata/public/assets/" + el.url}
                      alt={el.alt}
                      width="auto"
                    />
                    {el.title && <h5 data-id="h5_1">{el.title}</h5>}
                    {el.description && <p data-id="p_1">{el.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {enabledVideoSection && (videoSection.sectionTitle || videoSection.description || videoSection.videoUrl) && (
          <div id="video-section" class="section video-section">
            {videoSection.sectionTitle && (
              <h4 data-id="h4_1" class="header">
                {videoSection.sectionTitle}
              </h4>
            )}
            {videoSection.description && (
              <p
                data-id="p_1"
                class="section-description"
                dangerouslySetInnerHTML={{ __html: videoSection.description }}
              ></p>
            )}
            <div class="video-wrapper">
              <iframe
                data-id="iframe_1"
                width="100%"
                src={videoSection.videoUrl}
                title={videoSection.videoTitle}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </PreviewWrapper>
  );
};
