import { ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import LoginPage from "components/LoginPage";
import Header from "components/Header";
import { Redirect } from "react-router-dom";
import * as URL from "../../routes/url";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
