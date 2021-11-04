import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../../../store/auth/selectors';
import { usersPath } from '../../../utils';

const UnPrivateRoute = ({ children }) => {
  const token = useSelector(getAuthToken);
  return token ? <Navigate to={{ pathname: usersPath }} replace /> : children;
};

export default UnPrivateRoute;
