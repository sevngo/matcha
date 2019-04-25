import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Header from '../../containers/Header';
import Users from '../../containers/Users';
import User from '../../containers/User';
import SnackBars from '../../containers/Snackbars';
import Loading from '../../containers/Loading';
import styles from './styles';

const Component = ({ classes }) => (
  <div className={classes.root}>
    <Header />
    <Switch>
      <Route path="/" exact component={Users} />
      <Route path="/user/:id" exact render={({ match }) => <User match={match} />} />
      <Redirect to="/" />
    </Switch>
    <SnackBars />
    <Loading />
  </div>
);

export default withStyles(styles)(Component);
