import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import Header from '../../containers/Header';
import Loading from '../../containers/Loading';
import useStyles from './styles';
import { usersPath, routes } from '../../utils';
import Snackbar from '../../containers/Snackbar';
import PrivateRoute from '../PrivateRoute';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        {map(({ path, exact, component, isPrivate }) => {
          const props = { key: path, path, exact, component };
          if (isPrivate) return <PrivateRoute {...props} />;
          return <Route {...props} />;
        })(routes)}
        <Redirect to={usersPath} />
      </Switch>
      <Loading />
      <Snackbar />
    </div>
  );
};

export default App;
