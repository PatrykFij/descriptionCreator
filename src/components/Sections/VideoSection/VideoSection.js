import styled from 'styled-components';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { TextEditor } from '../../ContentEditable/ContentEditable';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const VideoSection = () => {
  const {
    videoSection,
    setVideoSection,
    enabledVideoSection,
    setEnabledVideoSection,
  } = useContext(AppContext);

  const handleEnableVideoSectionChange = () => {
    setEnabledVideoSection(!enabledVideoSection);
  };

  const handleSectionTitleChange = (e) => {
    setVideoSection((prevState) => {
      return { ...prevState, sectionTitle: e.target.value };
    });
  };

  const handleVideoUrlChange = (e) => {
    setVideoSection((prevState) => {
      return {
        ...prevState,
        videoUrl: e.target.value.replace('watch?v=', 'embed/').trim(),
      };
    });
  };

  const handleDescriptionChange = (e) => {
    setVideoSection((prevState) => {
      return { ...prevState, description: e.target.value };
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
            label="Nagłówek H4"
            defaultValue={videoSection.sectionTitle}
            value={videoSection.sectionTitle}
            variant="outlined"
            onChange={handleSectionTitleChange}
          />
          <TextEditor
            value={videoSection.description}
            handleChange={handleDescriptionChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj link url do filmu"
            defaultValue={videoSection.videoUrl}
            value={videoSection.videoUrl}
            variant="outlined"
            onChange={handleVideoUrlChange}
          />
        </>
      )}
    </>
  );
};
