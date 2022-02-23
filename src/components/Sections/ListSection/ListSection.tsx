import { useContext } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const ListSection = () => {
  const { productOfferDescription, setProductOfferDescription } =
    useContext(AppContext);

  const handleEnableListSectionChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      listSection: { ...prev.listSection, disabled: !event.target.checked },
    }));
  };

  const handleTitleChange = (event: any) => {
    setProductOfferDescription((prev: any) => ({
      ...prev,
      listSection: { ...prev.listSection, title: event.target.value },
    }));
  };

  const handleListItemsChange = (event: any) => {
    let items = event.target.value.split('\n');
    setProductOfferDescription((prev: any) => {
      return {
        ...prev,
        listSection: {
          ...prev.listSection,
          listItems: !!event.target.value
            ? items.map((el: string) => el.trim())
            : [],
        },
      };
    });
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={!productOfferDescription?.listSection?.disabled}
            onChange={handleEnableListSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z listą"
      />
      {!productOfferDescription?.listSection?.disabled && (
        <>
          <StyledTextField
            id="outlined-multiline-static"
            label="Nagłówek H4"
            defaultValue={productOfferDescription?.listSection?.title}
            value={productOfferDescription?.listSection?.title}
            variant="outlined"
            onChange={handleTitleChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj elementy listy"
            multiline
            rows={10}
            defaultValue={productOfferDescription?.listSection?.listItems.map(
              (el) => el + '\n',
            )}
            variant="outlined"
            onChange={handleListItemsChange}
          />
        </>
      )}
    </>
  );
};
