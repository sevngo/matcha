import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import { Box, LinearProgress } from '@material-ui/core';
import Header from '../../containers/Header';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';
import Snackbar from '../../containers/Snackbar';
import { useApp } from '../../hooks';
import PrivateRoute from '../PrivateRoute';

const App = () => {
  const classes = useStyles();
  const { isLoading } = useApp();
  return (
    <Box className={classes.root}>
      <Header />
      {isLoading && <LinearProgress />}
      <Box p={3} visibility={isLoading ? 'hidden' : 'visible'}>
        <Switch>
          {map(route => {
            const { isPrivate, path } = route;
            if (isPrivate) return <PrivateRoute key={path} {...route} />;
            return <Route key={path} {...route} />;
          })(routes)}
          <Redirect to={defaultRoute.path} />
        </Switch>
      </Box>
      <Snackbar />
    </Box>
  );
};

export default App;
