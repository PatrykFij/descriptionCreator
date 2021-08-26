import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const MainWrapper = styled.div`
  display: flex;
`;

export const FormWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  width: 100%;
  margin: 10px;
  padding: 10px;
`;

export const PreviewWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  height: 100vh;
  width: 100%;
  margin: 10px;
  padding: 10px;
`;
export const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
`;
