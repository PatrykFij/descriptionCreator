import React, { useState } from "react";
import { Mock } from "../../constants/Mock";

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
  setProducer: () => {},
  setTopHeader: () => {},
  setMiddleHeader: () => {},
  setBottomHeader: () => {},
  setParagraph: () => {},
  setEnabledListSection: () => {},
  setListSection: () => {},
  setEnabledBannerSection: () => {},
  setBannerSection: () => {},
  setEnabledPicturesSection: () => {},
  setPictureSectionTitle: () => {},
  setPictureItems: () => {},
  setEnabledVideoSection: () => {},
  setVideoSection: () => {},
};

export const AppContext = React.createContext(appCtxDefaultValue);

export const AppProvider = ({ children }) => {
  const [producer, setProducer] = useState(appCtxDefaultValue.producer);

  const [topHeader, setTopHeader] = useState(appCtxDefaultValue.topHeader);
  const [middleHeader, setMiddleHeader] = useState(appCtxDefaultValue.middleHeader);
  const [bottomHeader, setBottomHeader] = useState(appCtxDefaultValue.bottomHeader);

  const [paragraph, setParagraph] = useState(appCtxDefaultValue.paragraph);

  const [enabledListSection, setEnabledListSection] = useState(appCtxDefaultValue.enabledListSection);
  const [listSection, setListSection] = useState(appCtxDefaultValue.listSection);

  const [enabledBannerSection, setEnabledBannerSection] = useState(appCtxDefaultValue.enabledBannerSection);
  const [bannerSection, setBannerSection] = useState(appCtxDefaultValue.bannerSection);

  const [enabledPicturesSection, setEnabledPicturesSection] = useState(appCtxDefaultValue.enabledPicturesSection);
  const [pictureSectionTitle, setPictureSectionTitle] = useState(appCtxDefaultValue.pictureSectionTitle);
  const [pictureItems, setPictureItems] = useState(appCtxDefaultValue.pictureItems);

  const [enabledVideoSection, setEnabledVideoSection] = useState(appCtxDefaultValue.enabledVideoSection);
  const [videoSection, setVideoSection] = useState(appCtxDefaultValue.videoSection);

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
