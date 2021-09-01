import styled from "styled-components";
import { TextField, FormControlLabel, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";

const StyledFormControl = styled(FormControl)`
  display: block;

  .MuiSelect-root {
    min-width: 300px;
  }
`;

export const ProducerSection = () => {
  const { producer, setProducer } = useContext(AppContext);

  const handleChange = (event) => {
    setProducer(event.target.value);
  };

  return (
    <StyledFormControl>
      <InputLabel>Age</InputLabel>
      <Select value={producer} onChange={handleChange}>
        <MenuItem value={"producer-kemon.png"}>Kemon</MenuItem>
        <MenuItem value={"producer-yonelle.png"}>Yonelle</MenuItem>
        <MenuItem value={"producer-shangpree.png"}>Shangpree</MenuItem>
        <MenuItem value={"producer-alfapar.png"}>Alfapar</MenuItem>
        <MenuItem value={"producer-grazette.png"}>Grazette</MenuItem>
      </Select>
    </StyledFormControl>
  );
};
