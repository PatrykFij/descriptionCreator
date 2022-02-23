import { useContext } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import styled from 'styled-components';
import {
  AppContext,
  ProductOfferDescription,
} from '../../../context/AppContext/AppContext';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const BannerSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const handleEnableBannerSectionChange = (event: any) => {
    if (productOfferDescription) {
      setProductOfferDescription(
        (prev: ProductOfferDescription | undefined) =>
          prev && {
            ...prev,
            bannerSection: {
              ...prev.bannerSection,
              disabled: !event.target.checked,
            },
          },
      );
    }
  };

  const handleFileNameChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          bannerSection: {
            ...prev.bannerSection,
            imgFileName: event.target.value,
          },
        },
    );
  };
  const handleAltTagChange = (event: any) => {
    setProductOfferDescription(
      (prev: ProductOfferDescription | undefined) =>
        prev && {
          ...prev,
          bannerSection: {
            ...prev.bannerSection,
            imgAltTag: event.target.value,
          },
        },
    );
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={!productOfferDescription?.bannerSection?.disabled}
            onChange={handleEnableBannerSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z banerem"
      />
      {!productOfferDescription?.bannerSection?.disabled && (
        <>
          <StyledTextField
            id="outlined-multiline-static"
            label="Nazwe pliku z banerem"
            variant="outlined"
            helperText="* Maxymalna szerokość grafiki nie powinna być większa niż 1000px "
            value={productOfferDescription?.bannerSection?.imgFileName || ''}
            onChange={handleFileNameChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj ALT TAG opisujący zdjęcie"
            variant="outlined"
            value={productOfferDescription?.bannerSection?.imgAltTag || ''}
            onChange={handleAltTagChange}
          />
        </>
      )}
    </>
  );
};
