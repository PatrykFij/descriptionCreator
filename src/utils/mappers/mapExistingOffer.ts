import {
  PictureSectionItemsAttributes,
  SectionsID,
  SectionsQuerySelectors,
} from 'utils/constants';

export const mapExistingOffer = (existingOffer: any) => {
  const producer = existingOffer
    .querySelector(SectionsQuerySelectors.Producer)
    .href.replace('https://www.brillar-sklep.pl/', '');

  const topHeader = existingOffer.querySelector(
    SectionsQuerySelectors.TopHeader,
  )?.innerHTML;

  const middleHeader = existingOffer.querySelector(
    SectionsQuerySelectors.MiddleHeader,
  )?.innerHTML;

  const bottomHeader = existingOffer.querySelector(
    SectionsQuerySelectors.BottomHeader,
  )?.innerHTML;

  const descriptionSection = existingOffer.querySelector(
    SectionsQuerySelectors.DescriptionSection,
  )?.innerHTML;

  const listSection = {
    disabled: !existingOffer.querySelector(SectionsID.ListSection),
    title: existingOffer.querySelector(SectionsQuerySelectors.ListSectionTitle)
      ?.innerHTML,
    listItems: existingOffer.querySelector(
      SectionsQuerySelectors.ListSectionItems,
    )
      ? [
          ...existingOffer.querySelectorAll(
            SectionsQuerySelectors.ListSectionItem,
          ),
        ].map((el) => el.innerHTML)
      : [],
  };

  const bannerSection = {
    disabled: !existingOffer.querySelector(SectionsID.BannerSection),
    imgFileName: existingOffer
      .querySelector(SectionsQuerySelectors.BannerSectionImg)
      ?.src.replace(`${window.location.origin}/userdata/public/assets/`, ''),
    imgAltTag: existingOffer.querySelector(
      SectionsQuerySelectors.BannerSectionImg,
    )?.alt,
  };

  let pictureSectionItems = [
    ...existingOffer.querySelectorAll(
      SectionsQuerySelectors.PictureSectionItems,
    ),
  ];

  pictureSectionItems = pictureSectionItems.length
    ? pictureSectionItems.map((el) => ({
        url: el
          .querySelector(PictureSectionItemsAttributes.ImgAttribute)
          ?.src.replace(
            `${window.location.origin}/userdata/public/assets/`,
            '',
          ),
        alt: el.querySelector(PictureSectionItemsAttributes.ImgAttribute)?.alt,
        title: el.querySelector(PictureSectionItemsAttributes.TitleAttribute)
          ?.innerHTML,
        description: el.querySelector(
          PictureSectionItemsAttributes.DescriptionAttribute,
        )?.innerHTML,
      }))
    : [];

  const pictureSection = {
    disabled: !existingOffer.querySelector(SectionsID.PictureSection),
    title: existingOffer.querySelector(
      SectionsQuerySelectors.PictureSectionTitle,
    )?.innerHTML,
    pictureItems: pictureSectionItems,
  };

  const videoSection = {
    disabled: !existingOffer.querySelector(SectionsID.VideoSection),
    title: existingOffer
      .querySelector(SectionsQuerySelectors.VideoSectionTitle)
      ?.innerHTML.trim(),
    description: existingOffer
      .querySelector(SectionsQuerySelectors.VideoSectionDescription)
      ?.innerHTML.replace(/(?:^(?:&nbsp;)+)|(?:(?:&nbsp;)+$)/g, ''),
    videoUrl: existingOffer
      .querySelector(SectionsQuerySelectors.VideoSectionVideoUrl)
      ?.src.trim(),
  };

  return {
    producer,
    topHeader,
    middleHeader,
    bottomHeader,
    descriptionSection,
    listSection,
    bannerSection,
    pictureSection,
    videoSection,
  };
};
