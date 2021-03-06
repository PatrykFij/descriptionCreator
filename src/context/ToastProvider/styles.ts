import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import theme from "theme/theme";
import "react-toastify/dist/ReactToastify.min.css";

export const Toast = styled(ToastContainer)`
  .Toastify__toast--error {
    background: ${theme.palette.error.main};
    border-radius: 4px;
    align-items: center;
  }
  .Toastify__toast--success {
    background: ${theme.palette.success.main};
    border-radius: 4px;
    align-items: center;
  }
  .Toastify__toast-body {
    white-space: pre-line;
    color: white;
  }

  &.Toastify__toast-container {
    width: 400px;
  }
`;
