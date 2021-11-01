import React, { useState } from "react";
import ToastProvider from "components/ToastProvider";
import LoginPage from "../LoginPage/LoginPage";

const appCtxDefaultValue = {
  isAuth: false,
  setIsAuth: (val: boolean) => {},
};

export const AuthContext = React.createContext(appCtxDefaultValue);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(appCtxDefaultValue.isAuth);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
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
