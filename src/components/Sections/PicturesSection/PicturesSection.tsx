import { useContext, useMemo } from 'react';
import {
  Button,
  Checkbox,
  debounce,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledTitleTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const FormWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 15px 0;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 5px 0;
  }
`;

const FieldsWrapper = styled.div`
  width: 70%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 30%;

  & button {
    min-width: 70px;
    padding: 10px;
    min-height: 60px;
    margin: 5px;
  }

  & svg {
    width: 30px;
    height: 30px;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)``;

export const PicturesSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const copyOfProductOfferDescription = useMemo(
    () => ({ ...productOfferDescription }),
    [productOfferDescription],
  );

  const handleEnablePictureSectionChange = (event: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.disabled =
        !event.target.checked;
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handlePictureSectionTitleChange = (event: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.title =
        event.target.value.trim();
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handleAdd = () => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.pictureItems.push({
        url: '',
        alt: '',
        title: '',
        description: '',
      });
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handleChangePictureUrl = (event: any, index: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.pictureItems[index].url =
        event.target.value;
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handleChangePicturePictureAlt = (event: any, index: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.pictureItems[index].alt =
        event.target.value;
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handleChangePictureTitle = (event: any, index: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.pictureItems[index].title =
        event.target.value;
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handleChangePictureDescription = (event: any, index: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.pictureItems[
        index
      ].description = event.target.value;
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  const handleDeleteItem = (index: any) => {
    if (copyOfProductOfferDescription.pictureSection) {
      copyOfProductOfferDescription.pictureSection.pictureItems.splice(
        index,
        1,
      );
      setProductOfferDescription(copyOfProductOfferDescription);
    }
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={!productOfferDescription?.pictureSection?.disabled}
            onChange={handleEnablePictureSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja ze zdjęciami"
      />
      {!productOfferDescription?.pictureSection?.disabled && (
        <>
          <Button onClick={handleAdd} variant="contained" color="primary">
            Dodaj kolejną grafikę
            <AddIcon />
          </Button>
          <StyledTitleTextField
            label="Nagłówek H4"
            variant="outlined"
            defaultValue={productOfferDescription?.pictureSection?.title || ''}
            onChange={debounce(handlePictureSectionTitleChange, 2000)}
          />
          {productOfferDescription?.pictureSection?.pictureItems &&
            productOfferDescription?.pictureSection.pictureItems.map(
              (el: any, index: any) => (
                <FormWrapper key={index}>
                  <FieldsWrapper>
                    <StyledTextField
                      onChange={debounce(
                        (e) => handleChangePictureUrl(e, index),
                        2000,
                      )}
                      defaultValue={el.url}
                      placeholder="Nazwa pliku z grafiką"
                      label="Nazwa pliku z grafiką"
                      helperText="* Maxymalna szerokość grafiki nie powinna być większa niż 450px"
                      variant="outlined"
                    />
                    <StyledTextField
                      onChange={debounce(
                        (e) => handleChangePicturePictureAlt(e, index),
                        2000,
                      )}
                      defaultValue={el.alt}
                      placeholder="ALT tag"
                      label="ALT tag"
                      helperText="* Opis zdjęcia wyświetlany w momencie kiedy grafika nie może zostać załadowana"
                      variant="outlined"
                    />
                    <StyledTextField
                      onChange={debounce(
                        (e) => handleChangePictureTitle(e, index),
                        2000,
                      )}
                      defaultValue={el.title}
                      placeholder="Tytuł pod grafiką"
                      label="Tytuł pod grafiką"
                      variant="outlined"
                    />
                    <StyledTextField
                      onChange={debounce(
                        (e) => handleChangePictureDescription(e, index),
                        2000,
                      )}
                      defaultValue={el.description}
                      placeholder="Opis pod grafiką"
                      label="Opis pod grafiką"
                      variant="outlined"
                    />
                  </FieldsWrapper>
                  <ButtonsWrapper>
                    <Button
                      onClick={() => handleDeleteItem(index)}
                      variant="contained"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </Button>
                  </ButtonsWrapper>
                </FormWrapper>
              ),
            )}
        </>
      )}
    </>
  );
};
