import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { map } from 'ramda';
import { Box, LinearProgress } from '@material-ui/core';
import Header from '../Header';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';
import Snackbar from '../Snackbar';
import PrivateRoute from '../../components/PrivateRoute';
import { getLoading } from '../../selectors';

const App = () => {
  const classes = useStyles();
  const isLoading = useSelector(getLoading);
  return (
    <Box
      className={classes.root}
      style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
    >
      <Header />
      <LinearProgress
        style={{ visibility: isLoading ? 'visible' : 'hidden' }}
      />
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
