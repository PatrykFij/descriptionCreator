export const offerValidator = {
  validAltTags: () => {
    const offer = document.getElementById("preview");
    const images = [...offer.getElementsByTagName("img")];
    const hasEveryImgAltTag = images.map((el) => el.alt !== "").every((el) => el === true);
    return hasEveryImgAltTag;
  },
};
