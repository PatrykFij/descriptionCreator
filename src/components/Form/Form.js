import styled from "styled-components";
import { TextField, Checkbox, FormControlLabel } from "@material-ui/core";

const FormWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  margin: 10px;
  padding: 10px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const Form = ({
  setProducer,
  setTopHeader,
  setMiddleHeader,
  setBottomHeader,
  setFirstParagraph,
  setSecondParagraph,
  enabledListSection,
  setEnabledListSection,
  setListItems,
  enabledBannerSection,
  setEnabledBannerSection,
  setBannerLink,
  enabledPicturesSection,
  setEnabledPicturesSection,
  setPictureSectionTitle,
}) => {
  const handleProducerChange = (e) => {
    setProducer(e.target.value.trim());
  };

  const handleTopHeaderChange = (e) => {
    setTopHeader(e.target.value.trim());
  };

  const handleMiddleHeaderChange = (e) => {
    setMiddleHeader(e.target.value.trim());
  };

  const handleBottomHeaderChange = (e) => {
    setBottomHeader(e.target.value.trim());
  };

  const handleFirstParagraphChange = (e) => {
    setFirstParagraph(e.target.value.trim());
  };

  const handleSecondParagraphChange = (e) => {
    setSecondParagraph(e.target.value.trim());
  };

  const handleEnableListSectionChange = () => {
    setEnabledListSection(!enabledListSection);
  };

  const handleListItemsChange = (e) => {
    let items = e.target.value.split("\n");
    setListItems(items.map((el) => el.trim()));
  };

  const handleEnableBannerSectionChange = () => {
    setEnabledBannerSection(!enabledBannerSection);
  };

  const handleBannerLinkChange = (e) => {
    setBannerLink("https://www.brillar-sklep.pl/userdata/public/assets/" + e.target.value.trim());
  };

  const handleEnablePictureSectionChange = () => {
    setEnabledPicturesSection(!enabledPicturesSection);
  };

  const handlePictureSectionTitleChange = (e) => {
    setPictureSectionTitle(e.target.value.trim());
  };

  return (
    <FormWrapper>
      <StyledTextField onChange={handleProducerChange} label="Producent nagłówek H4" variant="outlined" />
      <StyledTextField onChange={handleTopHeaderChange} label="Nagłówek H2" variant="outlined" />
      <StyledTextField onChange={handleMiddleHeaderChange} label="Nagłówek H3" variant="outlined" />
      <StyledTextField onChange={handleBottomHeaderChange} label="Nagłówek H4" variant="outlined" />
      <StyledTextField
        onChange={handleFirstParagraphChange}
        multiline
        rows={10}
        label="Opis akapin nr 1"
        variant="outlined"
      />
      <StyledTextField
        onChange={handleSecondParagraphChange}
        multiline
        rows={10}
        label="Opis akapin nr 1"
        variant="outlined"
      />

      <StyledFormControlLabel
        control={
          <Checkbox
            checked={enabledListSection}
            onChange={handleEnableListSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z listą"
      />
      {enabledListSection && (
        <StyledTextField
          id="outlined-multiline-static"
          label="Podaj elementy listy"
          multiline
          rows={10}
          defaultValue=""
          variant="outlined"
          onChange={handleListItemsChange}
        />
      )}
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={enabledBannerSection}
            onChange={handleEnableBannerSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z banerem"
      />
      {enabledBannerSection && (
        <StyledTextField
          id="outlined-multiline-static"
          label="Nazwe pliku z banerem"
          variant="outlined"
          onChange={handleBannerLinkChange}
        />
      )}
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={enabledPicturesSection}
            onChange={handleEnablePictureSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja ze zdjęciami"
      />
      {enabledPicturesSection && (
        <StyledTextField
          id="outlined-multiline-static"
          label="Tytuł sekcji ze zdjęciami"
          variant="outlined"
          onChange={handlePictureSectionTitleChange}
        />
      )}
    </FormWrapper>
  );
};
