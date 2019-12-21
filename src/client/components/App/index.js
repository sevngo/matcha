import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import Header from '../../containers/Header';
import Loading from '../../containers/Loading';
import useStyles from './styles';
import { routes, defaultRoute } from '../../utils';
import Snackbar from '../../containers/Snackbar';
import PrivateRoute from '../PrivateRoute';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        {map(route => {
          const { isPrivate, path } = route;
          if (isPrivate) return <PrivateRoute key={path} {...route} />;
          return <Route key={path} {...route} />;
        })(routes)}
        <Redirect to={defaultRoute.path} />
      </Switch>
      <Loading />
      <Snackbar />
    </div>
  );
};

export default App;
