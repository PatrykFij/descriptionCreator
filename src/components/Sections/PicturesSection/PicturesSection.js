import styled from "styled-components";
import { TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../AppContext/AppContext";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import uuid from "react-uuid";

const StyledTitleTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const FormWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding: 2px 0;
`;

const StyledTextField = styled(TextField)`
  margin: 2px 0;
  width: 100%;
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
  const { enabledPicturesSection, setEnabledPicturesSection, setPictureSectionTitle, pictureItems, setPictureItems } =
    useContext(AppContext);

  const [pictureFields, setPictureFields] = useState();

  useEffect(() => {
    if (pictureItems) {
      let newValue = [...pictureItems];
      setPictureFields(newValue);
    }
  }, [pictureItems]);

  useEffect(() => {
    console.log(pictureFields);
  }, [pictureFields]);

  const handleEnablePictureSectionChange = () => {
    setEnabledPicturesSection(!enabledPicturesSection);
  };

  const handlePictureSectionTitleChange = (e) => {
    setPictureSectionTitle(e.target.value.trim());
  };

  const handleAdd = (e) => {
    setPictureItems((prevState) => [...prevState, { url: "", title: "", description: "" }]);
  };

  const handleChangePictureUrl = (e, index) => {
    pictureFields[index].url = e.target.value;
    setPictureFields(pictureFields);
  };

  const handleChangePicturePictureAlt = (e, index) => {
    pictureFields[index].alt = e.target.value;
    setPictureFields(pictureFields);
  };

  const handleChangePictureTitle = (e, index) => {
    pictureFields[index].title = e.target.value;
    setPictureFields(pictureFields);
  };

  const handleChangePictureDescription = (e, index) => {
    pictureFields[index].description = e.target.value;
    setPictureFields(pictureFields);
  };

  const handleDeleteItem = (index) => {
    let newValue = [...pictureFields];
    newValue.splice(index, 1);
    setPictureItems(newValue);
  };

  const handleRefreshItem = () => {
    setPictureItems(pictureFields);
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
        <>
          <StyledTitleTextField
            label="Tytuł sekcji ze zdjęciami"
            variant="outlined"
            onChange={handlePictureSectionTitleChange}
          />
          <Button onClick={handleAdd} variant="contained" color="primary">
            Dodaj kolejną grafikę
            <AddIcon />
          </Button>
          {pictureFields &&
            pictureFields.map((el, index) => (
              <FormWrapper key={uuid()}>
                <FieldsWrapper>
                  <StyledTextField
                    onChange={(e) => handleChangePictureUrl(e, index)}
                    defaultValue={el.url}
                    placeholder="Nazwa pliku z grafiką"
                    variant="outlined"
                  />
                  <StyledTextField
                    onChange={(e) => handleChangePicturePictureAlt(e, index)}
                    defaultValue={el.alt}
                    placeholder="ALT tag"
                    variant="outlined"
                  />
                  <StyledTextField
                    onChange={(e) => handleChangePictureTitle(e, index)}
                    defaultValue={el.title}
                    placeholder="Tytuł pod grafiką"
                    variant="outlined"
                  />
                  <StyledTextField
                    onChange={(e) => handleChangePictureDescription(e, index)}
                    defaultValue={el.description}
                    placeholder="Opis pod grafiką"
                    variant="outlined"
                  />
                </FieldsWrapper>
                <ButtonsWrapper>
                  <Button onClick={() => handleRefreshItem()} variant="contained" color="primary">
                    <RefreshIcon />
                  </Button>
                  <Button onClick={() => handleDeleteItem(index)} variant="contained" color="secondary">
                    <DeleteIcon />
                  </Button>
                </ButtonsWrapper>
              </FormWrapper>
            ))}
        </>
      )}
    </>
  );
};
