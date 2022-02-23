import { ProductOfferDescription } from 'context/AppContext/AppContext';
import styled from 'styled-components';
import { mediaQuery } from '../../constants/MediaQueries';
import '../../App.scss';

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

interface Props {
  productOfferDescription?: ProductOfferDescription;
}
export const Preview = ({ productOfferDescription }: Props) => {
  if (productOfferDescription) {
    const {
      producer,
      topHeader,
      middleHeader,
      bottomHeader,
      descriptionSection,
      bannerSection,
      listSection,
      pictureSection,
      videoSection,
    } = productOfferDescription;

    return (
      <PreviewWrapper id="preview">
        <div className="description-container">
          <div className="top-bar"></div>
          {producer && (
            <div id="producer-logo-section" className="producer-logo">
              <a
                data-id="a_1"
                href={`https://www.brillar-sklep.pl/` + producer}
              >
                <img
                  src={
                    'https://www.brillar-sklep.pl/userdata/public/assets/producer-' +
                    producer +
                    '.png'
                  }
                  alt="Logo producenta"
                  width="auto"
                />
              </a>
            </div>
          )}
          {(topHeader || middleHeader || bottomHeader) && (
            <div id="headers-section" className="section">
              {topHeader && <h2 data-id="h2_1">{topHeader}</h2>}
              {middleHeader && <h3 data-id="h3_1">{middleHeader}</h3>}
              {bottomHeader && <h4 data-id="h4_1">{bottomHeader}</h4>}
            </div>
          )}
          <div id="description-section" className="section">
            {descriptionSection && (
              <p
                data-id="p_1"
                dangerouslySetInnerHTML={{ __html: descriptionSection }}
              ></p>
            )}
          </div>

          {bannerSection &&
            !bannerSection.disabled &&
            bannerSection.imgFileName && (
              <div id="banner-section" className="section">
                <img
                  data-id="img_1"
                  className="img-frame"
                  src={
                    'https://www.brillar-sklep.pl/userdata/public/assets/' +
                    bannerSection.imgFileName
                  }
                  alt={bannerSection.imgAltTag}
                  width="auto"
                />
              </div>
            )}
          {listSection &&
            !listSection.disabled &&
            (listSection.title || listSection.listItems.length > 0) && (
              <div id="list-section" className="section">
                {listSection.title && (
                  <h4 data-id="h4_1" className="header">
                    {listSection.title}
                  </h4>
                )}
                <ul data-id="ul_1" className="list">
                  {listSection.listItems.map((el) =>
                    el ? <li>{el}</li> : null,
                  )}
                </ul>
              </div>
            )}
          {pictureSection &&
            !pictureSection.disabled &&
            (pictureSection.title ||
              pictureSection.pictureItems.length > 0) && (
              <div id="pictures-section" className="section">
                {pictureSection.title && (
                  <h4 data-id="h4_1" className="header">
                    {pictureSection.title}
                  </h4>
                )}
                {pictureSection.pictureItems.length > 0 && (
                  <div id="pictures-wrapper" className="image-section">
                    {pictureSection.pictureItems.map((el, index) => (
                      <div key={index} className="image-container">
                        <img
                          data-id="img_1"
                          src={
                            'https://www.brillar-sklep.pl/userdata/public/assets/' +
                            el.url
                          }
                          alt={el.alt}
                          width="auto"
                        />
                        {el.title && <h5 data-id="h5_1">{el.title}</h5>}
                        {el.description && (
                          <p data-id="p_1">{el.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          {videoSection &&
            !videoSection.disabled &&
            (videoSection.title ||
              videoSection.description ||
              videoSection.videoUrl) && (
              <div id="video-section" className="section video-section">
                {videoSection.title && (
                  <h4 data-id="h4_1" className="header">
                    {videoSection.title}
                  </h4>
                )}
                {videoSection.description && (
                  <p
                    data-id="p_1"
                    className="section-description"
                    dangerouslySetInnerHTML={{
                      __html: videoSection.description,
                    }}
                  ></p>
                )}
                <div className="video-wrapper">
                  <iframe
                    data-id="iframe_1"
                    width="100%"
                    src={videoSection.videoUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
        </div>
      </PreviewWrapper>
    );
  } else {
    return (
      <PreviewWrapper id="preview">
        <h1>Brak opisu</h1>
        <h3>Wybierz ofertę aby załadować istniejący opis</h3>
      </PreviewWrapper>
    );
  }
};
