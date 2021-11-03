import { ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import LoginPage from "components/LoginPage";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isAuth } = useContext(AuthContext);
  const showPages = useMemo(() => (isAuth ? <>{children}</> : <LoginPage />), [children, isAuth]);

  return (
    <>
      <div>{showPages}</div>
    </>
  );
};

export default Layout;
