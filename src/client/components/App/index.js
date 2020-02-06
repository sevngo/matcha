import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import { Box } from '@material-ui/core';
import Header from '../../containers/Header';
import Loading from '../../containers/Loading';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';
import Snackbar from '../../containers/Snackbar';
import PrivateRoute from '../PrivateRoute';

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Box p={3}>
        <Switch>
          {map(route => {
            const { isPrivate, path } = route;
            if (isPrivate) return <PrivateRoute key={path} {...route} />;
            return <Route key={path} {...route} />;
          })(routes)}
          <Redirect to={defaultRoute.path} />
        </Switch>
      </Box>
      <Loading />
      <Snackbar />
    </Box>
  );
};

export default App;
