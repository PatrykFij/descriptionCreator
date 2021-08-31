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

export const ListSection = () => {
  const { enabledListSection, listSection, setListSection, setEnabledListSection } = useContext(AppContext);

  const handleEnableListSectionChange = () => {
    setEnabledListSection(!enabledListSection);
  };

  const handleTitleChange = (e) => {
    setListSection((prevState) => {
      return { ...prevState, title: e.target.value.trim() };
    });
  };

  const handleListItemsChange = (e) => {
    let items = e.target.value.split("\n");
    setListSection((prevState) => {
      return { ...prevState, listItems: !!e.target.value ? items.map((el) => el.trim()) : [] };
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
            label="Podaj tytuł sekcji z listą"
            defaultValue={listSection.title}
            variant="outlined"
            onChange={handleTitleChange}
          />
          <StyledTextField
            id="outlined-multiline-static"
            label="Podaj elementy listy"
            multiline
            rows={10}
            defaultValue={listSection.listItems.map((el) => el + "\n")}
            variant="outlined"
            onChange={handleListItemsChange}
          />
        </>
      )}
    </>
  );
};
