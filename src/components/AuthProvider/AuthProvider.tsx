import React, { useState } from "react";
import ToastProvider from "components/ToastProvider";
import LoginPage from "../LoginPage/LoginPage";

const appCtxDefaultValue = {
  isAuthenticated: !!sessionStorage.getItem("access_token"),
  setIsAuthenticated: (val: boolean) => {},
  accessToken: "",
  setAccessToken: (val: string) => {},
};

export const AuthContext = React.createContext(appCtxDefaultValue);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(appCtxDefaultValue.isAuthenticated);
  const [accessToken, setAccessToken] = useState(appCtxDefaultValue.accessToken);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
