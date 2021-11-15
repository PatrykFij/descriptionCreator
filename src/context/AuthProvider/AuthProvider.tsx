import React, { Dispatch, SetStateAction, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
  const authenticated = JSON.parse(sessionStorage.getItem('state') || '{}')
    ?.user?.authenticated;

  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
