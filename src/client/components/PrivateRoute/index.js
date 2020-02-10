import React from 'react';
import { Route } from 'react-router-dom';
import { useToken } from '../../hooks';
import Auth from '../../containers/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useToken();
  return <Route {...rest} render={props => (token ? <Component {...props} /> : <Auth />)} />;
};

export default PrivateRoute;
