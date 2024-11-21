
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authToken: null,
  setAuthToken: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get('authToken') || null);

  useEffect(() => {
    if (authToken) {
      Cookies.set('authToken', authToken, { expires: 7 });
    } else {
      Cookies.remove('authToken');
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};
