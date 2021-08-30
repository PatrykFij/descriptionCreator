import React, { useState } from "react";
import { Mock } from "../../constants/Mock";

const appCtxDefaultValue = {
  producer: Mock.producer,
  topHeader: Mock.topHeader,
  middleHeader: Mock.middleHeader,
  bottomHeader: Mock.bottomHeader,
  paragraph: Mock.paragraph,
  enabledListSection: true,
  listItems: Mock.listItems,
  enabledBannerSection: true,
  bannerLink: Mock.bannerLink,
  enabledPicturesSection: true,
  pictureSectionTitle: Mock.pictureSectionTitle,
  pictureItems: Mock.pictureItems,
  setProducer: () => {},
  setTopHeader: () => {},
  setMiddleHeader: () => {},
  setBottomHeader: () => {},
  setParagraph: () => {},
  setEnabledListSection: () => {},
  setListItems: () => {},
  setEnabledBannerSection: () => {},
  setBannerLink: () => {},
  setEnabledPicturesSection: () => {},
  setPictureSectionTitle: () => {},
  setPictureItems: () => {},
};

export const AppContext = React.createContext(appCtxDefaultValue);

export const AppProvider = ({ children }) => {
  const [producer, setProducer] = useState(appCtxDefaultValue.producer);

  const [topHeader, setTopHeader] = useState(appCtxDefaultValue.topHeader);
  const [middleHeader, setMiddleHeader] = useState(appCtxDefaultValue.middleHeader);
  const [bottomHeader, setBottomHeader] = useState(appCtxDefaultValue.bottomHeader);

  const [paragraph, setParagraph] = useState(appCtxDefaultValue.paragraph);

  const [enabledListSection, setEnabledListSection] = useState(appCtxDefaultValue.enabledListSection);
  const [listItems, setListItems] = useState(appCtxDefaultValue.listItems);

  const [enabledBannerSection, setEnabledBannerSection] = useState(appCtxDefaultValue.enabledBannerSection);
  const [bannerLink, setBannerLink] = useState(appCtxDefaultValue.bannerLink);

  const [enabledPicturesSection, setEnabledPicturesSection] = useState(appCtxDefaultValue.enabledPicturesSection);
  const [pictureSectionTitle, setPictureSectionTitle] = useState(appCtxDefaultValue.pictureSectionTitle);
  const [pictureItems, setPictureItems] = useState(appCtxDefaultValue.pictureItems);

  return (
    <AppContext.Provider
      value={{
        producer,
        topHeader,
        middleHeader,
        bottomHeader,
        paragraph,
        enabledListSection,
        listItems,
        enabledBannerSection,
        bannerLink,
        enabledPicturesSection,
        pictureSectionTitle,
        pictureItems,
        setProducer,
        setTopHeader,
        setMiddleHeader,
        setBottomHeader,
        setParagraph,
        setEnabledListSection,
        setListItems,
        setEnabledBannerSection,
        setBannerLink,
        setEnabledPicturesSection,
        setPictureSectionTitle,
        setPictureItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
