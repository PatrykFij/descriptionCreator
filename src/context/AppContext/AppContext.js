import React, { useEffect, useState } from 'react';
import { Mock } from '../../constants/Mock';

const appCtxDefaultValue = {
  producer: Mock.producer,
  topHeader: Mock.topHeader,
  middleHeader: Mock.middleHeader,
  bottomHeader: Mock.bottomHeader,
  paragraph: Mock.paragraph,
  enabledListSection: true,
  listSection: Mock.listSection,
  enabledBannerSection: true,
  bannerSection: Mock.bannerSection,
  enabledPicturesSection: true,
  pictureSectionTitle: Mock.pictureSectionTitle,
  pictureItems: Mock.pictureItems,
  enabledVideoSection: true,
  videoSection: Mock.videoSection,
  setProducer: (val) => {},
  setTopHeader: (val) => {},
  setMiddleHeader: (val) => {},
  setBottomHeader: (val) => {},
  setParagraph: (val) => {},
  setEnabledListSection: (val) => {},
  setListSection: (val) => {},
  setEnabledBannerSection: (val) => {},
  setBannerSection: (val) => {},
  setEnabledPicturesSection: (val) => {},
  setPictureSectionTitle: (val) => {},
  setPictureItems: (val) => {},
  setEnabledVideoSection: (val) => {},
  setVideoSection: (val) => {},
};

export const AppContext = React.createContext(appCtxDefaultValue);

export const AppProvider = ({ children }) => {
  const localStorageValues = JSON.parse(
    localStorage.getItem('descriptionValues'),
  );

  const [producer, setProducer] = useState(
    localStorageValues?.producer || appCtxDefaultValue.producer,
  );

  const [topHeader, setTopHeader] = useState(
    localStorageValues?.topHeader || appCtxDefaultValue.topHeader,
  );
  const [middleHeader, setMiddleHeader] = useState(
    localStorageValues?.middleHeader || appCtxDefaultValue.middleHeader,
  );
  const [bottomHeader, setBottomHeader] = useState(
    localStorageValues?.bottomHeader || appCtxDefaultValue.bottomHeader,
  );

  const [paragraph, setParagraph] = useState(
    localStorageValues?.paragraph || appCtxDefaultValue.paragraph,
  );

  const [enabledListSection, setEnabledListSection] = useState(
    localStorageValues?.enabledListSection ||
      appCtxDefaultValue.enabledListSection,
  );
  const [listSection, setListSection] = useState(
    localStorageValues?.listSection || appCtxDefaultValue.listSection,
  );

  const [enabledBannerSection, setEnabledBannerSection] = useState(
    localStorageValues?.enabledBannerSection ||
      appCtxDefaultValue.enabledBannerSection,
  );
  const [bannerSection, setBannerSection] = useState(
    localStorageValues?.bannerSection || appCtxDefaultValue.bannerSection,
  );

  const [enabledPicturesSection, setEnabledPicturesSection] = useState(
    localStorageValues?.enabledPicturesSection ||
      appCtxDefaultValue.enabledPicturesSection,
  );
  const [pictureSectionTitle, setPictureSectionTitle] = useState(
    localStorageValues?.pictureSectionTitle ||
      appCtxDefaultValue.pictureSectionTitle,
  );
  const [pictureItems, setPictureItems] = useState(
    localStorageValues?.pictureItems || appCtxDefaultValue.pictureItems,
  );

  const [enabledVideoSection, setEnabledVideoSection] = useState(
    localStorageValues?.enabledVideoSection ||
      appCtxDefaultValue.enabledVideoSection,
  );
  const [videoSection, setVideoSection] = useState(
    localStorageValues?.videoSection || appCtxDefaultValue.videoSection,
  );

  useEffect(() => {
    const descriptionValues = {
      producer,
      topHeader,
      middleHeader,
      bottomHeader,
      paragraph,
      enabledListSection,
      listSection,
      enabledBannerSection,
      bannerSection,
      enabledPicturesSection,
      pictureSectionTitle,
      pictureItems,
      enabledVideoSection,
      videoSection,
    };
    localStorage.setItem(
      'descriptionValues',
      JSON.stringify(descriptionValues),
    );
  }, [
    producer,
    topHeader,
    middleHeader,
    bottomHeader,
    paragraph,
    enabledListSection,
    listSection,
    enabledBannerSection,
    bannerSection,
    enabledPicturesSection,
    pictureSectionTitle,
    pictureItems,
    enabledVideoSection,
    videoSection,
  ]);

  return (
    <AppContext.Provider
      value={{
        producer,
        topHeader,
        middleHeader,
        bottomHeader,
        paragraph,
        enabledListSection,
        listSection,
        enabledBannerSection,
        bannerSection,
        enabledPicturesSection,
        pictureSectionTitle,
        pictureItems,
        enabledVideoSection,
        videoSection,
        setProducer,
        setTopHeader,
        setMiddleHeader,
        setBottomHeader,
        setParagraph,
        setEnabledListSection,
        setListSection,
        setEnabledBannerSection,
        setBannerSection,
        setEnabledPicturesSection,
        setPictureSectionTitle,
        setPictureItems,
        setEnabledVideoSection,
        setVideoSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
