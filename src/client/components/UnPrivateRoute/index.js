import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../../selectors/auth';
import { usersPath } from '../../utils';

const UnPrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(getAuthToken);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Redirect to={{ pathname: usersPath }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default UnPrivateRoute;
