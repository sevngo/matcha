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
import { homeRoute, userRoute, resetRoute, verifyRoute } from '../../utils';
import styles from './styles';

const App = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Switch>
      <Route path={homeRoute} exact component={Users} />
      <Route path={userRoute(':id')} exact component={User} />
      <Route path={resetRoute(':token')} exact component={Reset} />
      <Route path={verifyRoute(':token')} exact component={Verify} />
      <Redirect to="/" />
    </Switch>
    <Snackbars />
    <Loading />
  </div>
);

export default withStyles(styles)(App);
