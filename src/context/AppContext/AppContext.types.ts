export interface ListSection {
  disabled: boolean;
  title: string;
  listItems: string[];
}

export interface BannerSection {
  disabled?: boolean;
  imgFileName?: string;
  imgAltTag?: string;
}

export interface PictureItem {
  url: string;
  alt: string;
  title: string;
  description: string;
}

export interface PictureSection {
  disabled: boolean;
  title: string;
  pictureItems: PictureItem[];
}

export interface VideoSection {
  disabled?: boolean;
  title?: string;
  description?: string;
  videoUrl?: string;
}

export interface ProductOfferDescription {
  producer?: string;
  topHeader?: string;
  middleHeader?: string;
  bottomHeader?: string;
  descriptionSection?: string;
  listSection?: ListSection;
  bannerSection?: BannerSection;
  pictureSection?: PictureSection;
  videoSection?: VideoSection;
}
