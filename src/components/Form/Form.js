import styled from "styled-components";
import { TextField } from "@material-ui/core";

const FormWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  width: 90%;
  margin: 10px;
  padding: 10px;
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;

export const Form = ({ setProducer, setTopHeader, setMiddleHeader }) => {
  const handleProducerChange = (e) => {
    setProducer(e.target.value);
  };

  const handleTopHeaderChange = (e) => {
    setTopHeader(e.target.value);
  };

  const handleMiddleHeaderChange = (e) => {
    setMiddleHeader(e.target.value);
  };

  return (
    <FormWrapper>
      <StyledTextField onChange={handleProducerChange} label="Producent nagłówek H4" variant="outlined" />
      <StyledTextField onChange={handleTopHeaderChange} label="Nagłówek H2" variant="outlined" />
      <StyledTextField onChange={handleMiddleHeaderChange} label="Nagłówek H3" variant="outlined" />
      <StyledTextField label="Nagłówek H4" variant="outlined" />
      <StyledTextField label="Opis akapin nr 1" variant="outlined" />
      <StyledTextField label="Opis akapin nr 1" variant="outlined" />
    </FormWrapper>
  );
};
