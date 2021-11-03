import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../../../store/auth/selectors';
import { loginPath } from '../../../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(getAuthToken);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: loginPath }} />
        )
      }
    />
  );
};

export default PrivateRoute;
