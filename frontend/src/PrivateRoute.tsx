
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  if (!authToken) {

    return <Navigate to="/login" replace />;
  }

  
  return children;
};

export default PrivateRoute;
