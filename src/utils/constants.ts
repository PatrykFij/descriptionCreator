export const adjustedDateDisplayFormat = 'YYYY-MM-DD';
export const dateDisplayFormat = 'DD.MM.YYYY';
export const dateAndTimeDisplayFormat = 'DD.MM.YYYY HH:mm';
export const monthYearDisplayFormat = 'MM.YYYY';

export const descriptionContainerClass = '.description-container';

export enum SectionsID {
  ProducerSection = '#producer-logo-section',
  HeadersSection = '#headers-section',
  DescriptionSection = '#description-section',
  ListSection = '#list-section',
  BannerSection = '#banner-section',
  PictureSection = '#pictures-section',
  VideoSection = '#video-section',
}

export enum SectionsQuerySelectors {
  Producer = `#producer-logo-section [data-id="a_1"]`,
  ProducerLogo = `#producer-logo-section img`,
  TopHeader = '#headers-section [data-id="h2_1"]',
  MiddleHeader = '#headers-section [data-id="h3_1"]',
  BottomHeader = '#headers-section [data-id="h4_1"]',
  DescriptionSection = '#description-section [data-id="p_1"]',
  ListSectionTitle = '#list-section [data-id="h4_1"]',
  ListSectionItems = '#list-section [data-id="ul_1"]',
  ListSectionItem = '#list-section [data-id="ul_1"] > li',
  BannerSectionImg = '#banner-section [data-id="img_1"]',
  PictureSectionTitle = '#pictures-section [data-id="h4_1"]',
  PictureSectionItems = '#pictures-section #pictures-wrapper .image-container',
  VideoSectionTitle = '#video-section [data-id="h4_1"]',
  VideoSectionDescription = '#video-section [data-id="p_1"]',
  VideoSectionVideoUrl = '#video-section [data-id="iframe_1"]',
}

export enum PictureSectionItemsAttributes {
  ImgAttribute = '[data-id="img_1"]',
  TitleAttribute = '[data-id="h5_1"]',
  DescriptionAttribute = '[data-id="p_1"]',
}
