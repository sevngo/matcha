import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import Header from '../../containers/Header';
import Loading from '../../containers/Loading';
import useStyles from './styles';
import { homePath, routes } from '../../utils';
import Snackbar from '../../containers/Snackbar';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Switch>
        {map(route => (
          <Route key={route} path={route.path} exact={route.exact} component={route.component} />
        ))(routes)}
        <Redirect to={homePath} />
      </Switch>
      <Loading />
      <Snackbar />
    </div>
  );
};

export default App;
