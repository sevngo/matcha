import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { map } from 'ramda';
import { Box } from '@material-ui/core';
import Header from '../../containers/Header';
import Snackbar from '../../containers/Snackbar';
import Loader from '../../containers/Loader';
import PrivateRoute from '../routing/PrivateRoute';
import UnPrivateRoute from '../routing/UnPrivateRoute';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Loader />
      <Suspense fallback={<Loader />}>
        <Box p={3}>
          <Routes>
            {map((route) => {
              const { isPrivate, isUnPrivate, Component, ...rest } = route;
              if (isPrivate)
                return (
                  <Route
                    element={
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    }
                    {...rest}
                  />
                );
              if (isUnPrivate)
                return (
                  <Route
                    element={
                      <UnPrivateRoute>
                        <Component />
                      </UnPrivateRoute>
                    }
                    {...rest}
                  />
                );
              return <Route element={<Component />} {...rest} />;
            })(routes)}
            <Navigate to={defaultRoute.path} />
          </Routes>
        </Box>
      </Suspense>
      <Snackbar />
    </Box>
  );
};

export default App;
