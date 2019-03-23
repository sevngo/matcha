import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Header from '../../containers/Header';
import Users from '../../containers/Users';
import User from '../../containers/User';
import SnackBars from '../../containers/Snackbars';
import Loading from '../../containers/Loading';

const styles = {
  root: {
    backgroundImage: 'url(//www.gstatic.com/pantheon/images/marketplace/cameo_banner-1x.png)',
    minHeight: '100vh',
  },
};

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
