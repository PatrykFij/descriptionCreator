import styled from "styled-components";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const PicturesSection = () => {
  const { enabledPicturesSection, setEnabledPicturesSection, setPictureSectionTitle } = useContext(AppContext);

  const handleEnablePictureSectionChange = () => {
    setEnabledPicturesSection(!enabledPicturesSection);
  };

  const handlePictureSectionTitleChange = (e) => {
    setPictureSectionTitle(e.target.value.trim());
  };

  return (
    <>
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
    </>
  );
};
