import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../../hooks';
import Auth from '../../containers/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();
  return <Route {...rest} render={props => (auth.token ? <Component {...props} /> : <Auth />)} />;
};

export default PrivateRoute;
