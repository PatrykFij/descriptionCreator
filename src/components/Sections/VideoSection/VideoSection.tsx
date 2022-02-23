import { useContext } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {
  AppContext,
  ProductOfferDescription,
} from '../../../context/AppContext/AppContext';
import { TextEditor } from '../../ContentEditable/ContentEditable';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const VideoSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const handleEnableVideoSectionChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          videoSection: {
            ...prev?.videoSection,
            disabled: !event.target.checked,
          },
        },
    );
  };

  const handleSectionTitleChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          videoSection: { ...prev?.videoSection, title: event.target.value },
        },
    );
  };

  const handleVideoUrlChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          videoSection: {
            ...prev?.videoSection,
            videoUrl: event.target.value.replace('watch?v=', 'embed/').trim(),
          },
        },
    );
  };

  const handleDescriptionChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          description: {
            ...prev?.videoSection,
            description: event.target.value,
          },
        },
    );
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={!productOfferDescription?.videoSection?.disabled}
            onChange={handleEnableVideoSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z listą"
      />
      {!productOfferDescription?.videoSection?.disabled && (
        <>
          <StyledTextField
            id="outlined-multiline-static"
            label="Nagłówek H4"
            defaultValue={productOfferDescription?.videoSection?.title}
            value={productOfferDescription?.videoSection?.title}
            variant="outlined"
            onChange={handleSectionTitleChange}
          />
          <TextEditor
            value={productOfferDescription?.videoSection?.description}
            handleChange={handleDescriptionChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj link url do filmu"
            defaultValue={productOfferDescription?.videoSection?.videoUrl}
            value={productOfferDescription?.videoSection?.videoUrl}
            variant="outlined"
            onChange={handleVideoUrlChange}
          />
        </>
      )}
    </>
  );
};
