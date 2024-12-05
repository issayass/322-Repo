import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Cookies from 'js-cookie';

interface AuthContextProps {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  role: string;
  setRole: (role: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authToken: null,
  setAuthToken: () => {},
  role: 'guest',
  setRole: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(Cookies.get('authToken') || null);
  const [role, setRole] = useState<string>('guest');

  useEffect(() => {
    if (authToken) {
      Cookies.set('authToken', authToken, { expires: 7 });
    } else {
      Cookies.remove('authToken');
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
