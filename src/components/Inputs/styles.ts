import styled from "styled-components";
import theme from "theme/theme";

export const ErrorLabel = styled.p`
  color: ${theme.palette.error.main};
  font-size: 0.75rem;
  margin: 0;
  height: 0.75rem; // reserve the space to avoid a jumpy input when error label shows
`;
