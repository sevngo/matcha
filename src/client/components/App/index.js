import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import { Box } from '@material-ui/core';
import Header from '../../containers/Header';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';
import Snackbar from '../../containers/Snackbar';
import PrivateRoute from '../PrivateRoute';
import Loader from '../../containers/Loader';

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Loader />
      <Box p={3}>
        <Switch>
          {map((route) => {
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