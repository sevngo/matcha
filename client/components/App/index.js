import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Header from '../../containers/Header';
import Users from '../../containers/Users';
import User from '../../containers/User';
import Snackbars from '../../containers/Snackbars';
import Loading from '../../containers/Loading';
import Reset from '../../containers/Reset';
import Verify from '../../containers/Verify';
import styles from './styles';

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/user/:id" exact render={({ match }) => <User match={match} />} />
      <Route path="/reset/:token" exact render={({ match }) => <Reset match={match} />} />
      <Route path="/verify/:token" exact render={({ match }) => <Verify match={match} />} />
      <Redirect to="/" />
    </Switch>
    <Snackbars />
    <Loading />
  </div>
);

export default withStyles(styles)(App);
