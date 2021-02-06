import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import { Box } from '@material-ui/core';
import Header from '../../containers/Header';
import Snackbar from '../../containers/Snackbar';
import Loader from '../../containers/Loader';
import PrivateRoute from '../PrivateRoute';
import UnPrivateRoute from '../UnPrivateRoute';
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
          <Switch>
            {map((route) => {
              const { isPrivate, isUnPrivate, path } = route;
              if (isPrivate) return <PrivateRoute key={path} {...route} />;
              if (isUnPrivate) return <UnPrivateRoute key={path} {...route} />;
              return <Route key={path} {...route} />;
            })(routes)}
            <Redirect to={defaultRoute.path} />
          </Switch>
        </Box>
      </Suspense>
      <Snackbar />
    </Box>
  );
};

export default App;
