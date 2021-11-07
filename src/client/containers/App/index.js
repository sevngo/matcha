import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { map } from 'ramda';
import { Box } from '@material-ui/core';
import Header from '../Header';
import Snackbar from '../Snackbar';
import Loader from '../Loader';
import PrivateRoute from '../../components/routing/PrivateRoute';
import UnPrivateRoute from '../../components/routing/UnPrivateRoute';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
    </div>
  );
};

export default App;
