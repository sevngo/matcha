import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../selectors';
import Auth from '../../containers/Auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(getToken);
  return (
    <Route
      {...rest}
      render={(props) => (token ? <Component {...props} /> : <Auth />)}
    />
  );
};

export default PrivateRoute;
