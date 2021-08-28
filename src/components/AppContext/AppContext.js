import React, { useState } from "react";
import { Mock } from "../../constants/Mock";

const appCtxDefaultValue = {
  producer: Mock.producer,
  topHeader: Mock.topHeader,
  middleHeader: Mock.middleHeader,
  bottomHeader: Mock.bottomHeader,
  firstParagraph: Mock.firstParagraph,
  secondParagraph: Mock.secondParagraph,
  enabledListSection: false,
  listItems: Mock.listItems,
  enabledBannerSection: false,
  bannerLink: Mock.bannerLink,
  enabledPicturesSection: false,
  pictureSectionTitle: Mock.pictureSectionTitle,
  pictureItems: Mock.pictureItems,
  setProducer: () => {},
  setTopHeader: () => {},
  setMiddleHeader: () => {},
  setBottomHeader: () => {},
  setFirstParagraph: () => {},
  setSecondParagraph: () => {},
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

  const [firstParagraph, setFirstParagraph] = useState(appCtxDefaultValue.firstParagraph);
  const [secondParagraph, setSecondParagraph] = useState(appCtxDefaultValue.secondParagraph);

  const [enabledListSection, setEnabledListSection] = useState(false);
  const [listItems, setListItems] = useState(appCtxDefaultValue.listItems);

  const [enabledBannerSection, setEnabledBannerSection] = useState(false);
  const [bannerLink, setBannerLink] = useState(appCtxDefaultValue.bannerLink);

  const [enabledPicturesSection, setEnabledPicturesSection] = useState(false);
  const [pictureSectionTitle, setPictureSectionTitle] = useState(appCtxDefaultValue.pictureSectionTitle);
  const [pictureItems, setPictureItems] = useState(appCtxDefaultValue.pictureItems);

  return (
    <AppContext.Provider
      value={{
        producer,
        topHeader,
        middleHeader,
        bottomHeader,
        firstParagraph,
        secondParagraph,
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
        setFirstParagraph,
        setSecondParagraph,
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
