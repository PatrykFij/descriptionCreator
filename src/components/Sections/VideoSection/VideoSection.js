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
  const { videoUrl, setVideoUrl, enabledVideoSection, setEnabledVideoSection } = useContext(AppContext);

  const handleEnableVideoSectionChange = () => {
    setEnabledVideoSection(!enabledVideoSection);
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value.trim());
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
        <StyledTextField
          id="outlined-multiline-static"
          label="Podaj link url do filmu"
          defaultValue={videoUrl}
          variant="outlined"
          onChange={handleVideoUrlChange}
        />
      )}
    </>
  );
};
