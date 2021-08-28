// import "./App.scss";
import { useState } from "react";
import { Typography, Snackbar } from "@material-ui/core";
import { MainWrapper, StyledButton } from "./App.css.js";
import { Form } from "./components/Form/Form";
import { Preview } from "./components/Preview/Preview";
import { Mock } from "./constants/Mock";

const App = () => {
  const [open, setOpen] = useState(false);
  const [producer, setProducer] = useState(Mock.producer);
  const [topHeader, setTopHeader] = useState(Mock.topHeader);
  const [middleHeader, setMiddleHeader] = useState(Mock.middleHeader);
  const [bottomHeader, setBottomHeader] = useState(Mock.bottomHeader);

  const [firstParagraph, setFirstParagraph] = useState(Mock.firstParagraph);
  const [secondParagraph, setSecondParagraph] = useState(Mock.secondParagraph);

  const [enabledListSection, setEnabledListSection] = useState(false);
  const [listItems, setListItems] = useState(Mock.listItems);

  const [enabledBannerSection, setEnabledBannerSection] = useState(false);
  const [bannerLink, setBannerLink] = useState(Mock.bannerLink);

  const [enabledPicturesSection, setEnabledPicturesSection] = useState(false);
  const [pictureSectionTitle, setPictureSectionTitle] = useState(Mock.pictureSectionTitle);
  const [pictureItems, setPictureItems] = useState(Mock.pictureItems);

  const handleCopyDescriptionCode = () => {
    var previewCode = document.getElementById("preview").innerHTML;
    navigator.clipboard.writeText(previewCode);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      <Typography align="center" variant="h1" component="h2">
        Creator opisów Brillar
      </Typography>
      <MainWrapper>
        <Form
          setProducer={setProducer}
          setTopHeader={setTopHeader}
          setMiddleHeader={setMiddleHeader}
          setBottomHeader={setBottomHeader}
          setFirstParagraph={setFirstParagraph}
          setSecondParagraph={setSecondParagraph}
          enabledListSection={enabledListSection}
          setEnabledListSection={setEnabledListSection}
          setListItems={setListItems}
          enabledBannerSection={enabledBannerSection}
          setEnabledBannerSection={setEnabledBannerSection}
          setBannerLink={setBannerLink}
          enabledPicturesSection={enabledPicturesSection}
          setEnabledPicturesSection={setEnabledPicturesSection}
          setPictureSectionTitle={setPictureSectionTitle}
        />
        <StyledButton onClick={handleCopyDescriptionCode} variant="contained" color="primary">
          Kopiuj kod źródłowy opisu
        </StyledButton>
        <Preview
          producer={producer}
          topHeader={topHeader}
          middleHeader={middleHeader}
          bottomHeader={bottomHeader}
          firstParagraph={firstParagraph}
          secondParagraph={secondParagraph}
          enabledListSection={enabledListSection}
          listItems={listItems}
          bannerLink={bannerLink}
          enabledBannerSection={enabledBannerSection}
          enabledPicturesSection={enabledPicturesSection}
          pictureItems={pictureItems}
          pictureSectionTitle={pictureSectionTitle}
        />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Skopiowano"
        />
      </MainWrapper>
    </div>
  );
};

export default App;
