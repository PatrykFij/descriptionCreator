import React, { useState } from "react";
import ToastProvider from "components/ToastProvider";
import LoginPage from "../LoginPage/LoginPage";

const appCtxDefaultValue = {
  isAuth: !!sessionStorage.getItem("access_token"),
  setIsAuth: (val: boolean) => {},
  accessToken: sessionStorage.getItem("access_token"),
  setAccessToken: (val: string) => {},
};

export const AuthContext = React.createContext(appCtxDefaultValue);

export const AuthProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(appCtxDefaultValue.isAuth);
  const [accessToken, setAccessToken] = useState(appCtxDefaultValue.accessToken);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, accessToken, setAccessToken }}>
      {isAuth ? (
        children
      ) : (
        <>
          <ToastProvider />
          <LoginPage />
        </>
      )}
    </AuthContext.Provider>
  );
};
