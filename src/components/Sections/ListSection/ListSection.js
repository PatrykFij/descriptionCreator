import { useContext } from 'react';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { AppContext } from '../../../context/AppContext/AppContext';

const StyledTextField = styled(TextField)`
  && {
    width: 100%;
    margin: 10px 0;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  display: block;
`;

export const ListSection = () => {
  const {
    enabledListSection,
    listSection,
    setListSection,
    setEnabledListSection,
  } = useContext(AppContext);

  const handleEnableListSectionChange = () => {
    setEnabledListSection(!enabledListSection);
  };

  const handleTitleChange = (e) => {
    setListSection((prevState) => {
      return { ...prevState, title: e.target.value };
    });
  };

  const handleListItemsChange = (e) => {
    let items = e.target.value.split('\n');
    setListSection((prevState) => {
      return {
        ...prevState,
        listItems: !!e.target.value ? items.map((el) => el.trim()) : [],
      };
    });
  };

  return (
    <>
      <StyledFormControlLabel
        control={
          <Checkbox
            checked={enabledListSection}
            onChange={handleEnableListSectionChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Sekcja z listą"
      />
      {enabledListSection && (
        <>
          <StyledTextField
            id="outlined-multiline-static"
            label="Nagłówek H4"
            defaultValue={listSection.title}
            value={listSection.title}
            variant="outlined"
            onChange={handleTitleChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj elementy listy"
            multiline
            rows={10}
            defaultValue={listSection.listItems.map((el) => el + '\n')}
            variant="outlined"
            onChange={handleListItemsChange}
          />
        </>
      )}
    </>
  );
};
