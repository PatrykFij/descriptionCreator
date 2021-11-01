import { DialogActions as MDialogActions, DialogContent } from "@material-ui/core";
import styled from "styled-components";

export const DialogContentWrapper = styled(DialogContent)`
  && {
    padding: 1rem;
  }
`;

export const DialogActions = styled(MDialogActions)`
  margin: 0 0.5rem 0.5rem;
`;
