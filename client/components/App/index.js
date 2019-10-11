import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { map } from 'ramda';
import Header from '../../containers/Header';
import Snackbars from '../../containers/Snackbars';
import Loading from '../../containers/Loading';
import useStyles from './styles';
import { homePath, routes } from '../../utils';

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
      <Snackbars />
      <Loading />
    </div>
  );
};

export default App;
