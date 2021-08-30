import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

export const TopHeaderSection = () => {
  const { setTopHeader, setMiddleHeader, setBottomHeader } = useContext(AppContext);

  const handleTopHeaderChange = (e) => {
    setTopHeader(e.target.value.trim());
  };

  const handleMiddleHeaderChange = (e) => {
    setMiddleHeader(e.target.value.trim());
  };

  const handleBottomHeaderChange = (e) => {
    setBottomHeader(e.target.value.trim());
  };

  return (
    <>
      <StyledTextField onChange={handleTopHeaderChange} label="Nagłówek H2" variant="outlined" />
      <StyledTextField onChange={handleMiddleHeaderChange} label="Nagłówek H3" variant="outlined" />
      <StyledTextField onChange={handleBottomHeaderChange} label="Nagłówek H4" variant="outlined" />
    </>
  );
};