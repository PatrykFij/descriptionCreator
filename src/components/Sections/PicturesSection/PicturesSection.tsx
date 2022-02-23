import { useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import styled from 'styled-components';
import {
  AppContext,
  PictureItem,
} from '../../../context/AppContext/AppContext';

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

  const [pictureItems, setPictureItems] = useState<PictureItem[] | undefined>(
    productOfferDescription?.pictureSection?.pictureItems,
  );

  useEffect(() => {
    if (pictureItems) {
      setProductOfferDescription((prev: any) => ({
        ...prev,
        pictureSection: {
          ...prev?.pictureSection,
          pictureItems: pictureItems,
        },
      }));
      // setPictureItems(newValue);
    }
  }, [pictureItems, setProductOfferDescription]);

  const handleEnablePictureSectionChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      pictureSection: {
        ...prev?.pictureSection,
        disabled: !event.target.checked,
      },
    }));
  };

  const handlePictureSectionTitleChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      pictureSection: {
        ...prev?.pictureSection,
        title: event.target.value.trim(),
      },
    }));
  };

  const handleAdd = (event: any) => {
    setPictureItems((prev) =>
      prev
        ? [...prev, { url: '', alt: '', title: '', description: '' }]
        : [{ url: '', alt: '', title: '', description: '' }],
    );
  };

  const handleChangePictureUrl = (event: any, index: any) => {
    if (pictureItems) {
      pictureItems[index].url = event.target.value;
      setPictureItems(pictureItems);
    }
  };

  const handleChangePicturePictureAlt = (event: any, index: any) => {
    if (pictureItems) {
      pictureItems[index].alt = event.target.value;
      setPictureItems(pictureItems);
    }
  };

  const handleChangePictureTitle = (event: any, index: any) => {
    if (pictureItems) {
      pictureItems[index].title = event.target.value;
      setPictureItems(pictureItems);
    }
  };

  const handleChangePictureDescription = (event: any, index: any) => {
    if (pictureItems) {
      pictureItems[index].description = event.target.value;
      setPictureItems(pictureItems);
    }
  };

  const handleDeleteItem = (index: any) => {
    if (pictureItems) {
      let newValue = [...pictureItems];
      newValue.splice(index, 1);
      setPictureItems(newValue);
    }
  };

  const handleRefreshItem = () => {
    setPictureItems(pictureItems);
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
            defaultValue={productOfferDescription?.pictureSection?.title}
            onChange={handlePictureSectionTitleChange}
          />
          {productOfferDescription?.pictureSection?.pictureItems &&
            productOfferDescription?.pictureSection.pictureItems.map(
              (el: any, index: any) => (
                <FormWrapper key={uuid()}>
                  <FieldsWrapper>
                    <StyledTextField
                      onChange={(e) => handleChangePictureUrl(e, index)}
                      defaultValue={el.url}
                      placeholder="Nazwa pliku z grafiką"
                      label="Nazwa pliku z grafiką"
                      helperText="* Maxymalna szerokość grafiki nie powinna być większa niż 450px"
                      variant="outlined"
                    />
                    <StyledTextField
                      onChange={(e) => handleChangePicturePictureAlt(e, index)}
                      defaultValue={el.alt}
                      placeholder="ALT tag"
                      label="ALT tag"
                      helperText="* Opis zdjęcia wyświetlany w momencie kiedy grafika nie może zostać załadowana"
                      variant="outlined"
                    />
                    <StyledTextField
                      onChange={(e) => handleChangePictureTitle(e, index)}
                      defaultValue={el.title}
                      placeholder="Tytuł pod grafiką"
                      label="Tytuł pod grafiką"
                      variant="outlined"
                    />
                    <StyledTextField
                      onChange={(e) => handleChangePictureDescription(e, index)}
                      defaultValue={el.description}
                      placeholder="Opis pod grafiką"
                      label="Opis pod grafiką"
                      variant="outlined"
                    />
                  </FieldsWrapper>
                  <ButtonsWrapper>
                    <Button
                      onClick={() => handleRefreshItem()}
                      variant="contained"
                      color="primary"
                    >
                      <RefreshIcon />
                    </Button>
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
