import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../selectors';
import { loginPath } from '../../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(getToken);
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
