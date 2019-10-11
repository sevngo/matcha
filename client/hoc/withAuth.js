import React from 'react';
import { useSelector } from 'react-redux';
import Auth from '../containers/Auth';
import { getToken } from '../selectors';

const withAuth = Component => props => {
  const token = useSelector(getToken);
  return token ? <Component {...props} /> : <Auth />;
};
export default withAuth;
