import React, { useState } from "react";
import LoginPage from "../LoginPage/LoginPage";

const appCtxDefaultValue = {
  isAuth: false,
};

export const AppContext = React.createContext(appCtxDefaultValue);

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(appCtxDefaultValue.isAuth);

  return <AppContext.Provider value={{ isAuth }}>{isAuth ? children : <LoginPage />}</AppContext.Provider>;
};
