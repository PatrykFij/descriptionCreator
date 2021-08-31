import styled from "styled-components";
import { Button } from "@material-ui/core";
import { mediaQuery } from "./constants/MediaQueries";

export const MainWrapper = styled.div`
  display: flex;
  margin: 30px;
  justify-content: center;
  ${mediaQuery.XL} {
    flex-wrap: wrap;
  }

  ${mediaQuery.SM} {
    margin: 0;
  }
`;

export const StyledButton = styled(Button)`
  height: auto;
  width: 10%;
  align-self: center;
  margin-left: 40px;
  max-width: 200px;
`;
