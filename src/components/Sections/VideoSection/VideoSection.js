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

export const VideoSection = () => {
  const { videoSection, setVideoSection, enabledVideoSection, setEnabledVideoSection } = useContext(AppContext);

  const handleEnableVideoSectionChange = () => {
    setEnabledVideoSection(!enabledVideoSection);
  };

  const handleSectionTitleChange = (e) => {
    setVideoSection((prevState) => {
      return { ...prevState, sectionTitle: e.target.value.trim() };
    });
  };

  const handleVideoTitleChange = (e) => {
    setVideoSection((prevState) => {
      return { ...prevState, videoTitle: e.target.value.trim() };
    });
  };

  const handleVideoUrlChange = (e) => {
    setVideoSection((prevState) => {
      return { ...prevState, videoUrl: e.target.value.trim() };
    });
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={enabledVideoSection}
            onChange={handleEnableVideoSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z listą"
      />
      {enabledVideoSection && (
        <>
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj tytuł sekcji video"
            defaultValue={videoSection.sectionTitle}
            variant="outlined"
            onChange={handleSectionTitleChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj tytuł video"
            defaultValue={videoSection.videoTitle}
            helperText="* Tytuł wideo nie jest widoczny w opisie, ale należy go poprawnie wprowadzić"
            variant="outlined"
            onChange={handleVideoTitleChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj link url do filmu"
            defaultValue={videoSection.videoUrl}
            variant="outlined"
            onChange={handleVideoUrlChange}
          />
        </>
      )}
    </>
  );
};
