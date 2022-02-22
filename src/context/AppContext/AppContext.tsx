import React, {
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Mock } from '../../constants/Mock';

interface ListSection {
  disabled: boolean;
  title: string;
  listItems: string[];
}

interface BannerSection {
  disabled: boolean;
  imgFileName: string;
  imgAltTag: string;
}

export interface PictureItem {
  url: string;
  alt: string;
  title: string;
  description: string;
}

interface PictureSection {
  disabled: boolean;
  title: string;
  pictureItems: PictureItem[];
}

interface VideoSection {
  disabled: boolean;
  title: string;
  description: string;
  videoUrl: string;
}

export interface ProductOfferDescription {
  producer: string;
  topHeader: string;
  middleHeader: string;
  bottomHeader: string;
  descriptionSection: string;
  listSection: ListSection;
  bannerSection: BannerSection;
  pictureSection: PictureSection;
  videoSection: VideoSection;
}

const appCtxDefaultValue = {
  productOfferDescription: Mock,
  setProductOfferDescription: () => {},
};

interface ProductOfferDescriptionContext {
  productOfferDescription: ProductOfferDescription;
  setProductOfferDescription: React.Dispatch<
    SetStateAction<ProductOfferDescription>
  >;
}

export const AppContext =
  React.createContext<ProductOfferDescriptionContext>(appCtxDefaultValue);

interface Props {
  children: ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [productOfferDescription, setProductOfferDescription] =
    useState<ProductOfferDescription>(
      appCtxDefaultValue.productOfferDescription,
    );

  useEffect(() => {
    localStorage.setItem(
      'descriptionValues',
      JSON.stringify(productOfferDescription),
    );
  }, [productOfferDescription]);

  const value = useMemo(
    () => ({
      productOfferDescription,
      setProductOfferDescription,
    }),
    [productOfferDescription, setProductOfferDescription],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
