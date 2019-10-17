import React from 'react';
import { Route } from 'react-router-dom';
import { useConnect } from './hooks';
import Auth from '../../containers/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = useConnect();
  return <Route {...rest} render={props => (token ? <Component {...props} /> : <Auth />)} />;
};

export default PrivateRoute;
