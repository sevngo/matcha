import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../../../store/auth/selectors';
import { loginPath } from '../../../utils';

const PrivateRoute = ({ children }) => {
  const token = useSelector(getAuthToken);
  return token ? children : <Navigate to={{ pathname: loginPath }} replace />;
};

export default PrivateRoute;
