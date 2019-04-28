import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Header from '../../containers/Header';
import Users from '../../containers/Users';
import User from '../../containers/User';
import Notifications from '../../containers/Notifications';
import Loading from '../../containers/Loading';
import styles from './styles';

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/user/:id" exact render={({ match }) => <User match={match} />} />
      <Redirect to="/" />
    </Switch>
    <Notifications />
    <Loading />
  </div>
);

export default withStyles(styles)(App);
