import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
import Drawer from '../Drawer';
import Account from '../Account';
import Notifications from '../Notifications';
import IconButton from '../../components/IconButton';
import { logout, removeNotification } from '../../actions';
import { getMyUser } from '../../selectors';
import { homeRoute } from '../../utils';
import styles from './styles';
import messages from './messages';

const Header = ({ classes, myUser, location: { pathname } }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const { token } = myUser;
  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {pathname === homeRoute && token ? (
            <IconButton onClick={() => toggleDrawer(true)} className={classes.icon}>
              menu
            </IconButton>
          ) : (
            <IconButton className={classes.icon} component={Link} to={homeRoute}>
              home
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.title}>
            <FormattedMessage {...messages.title} />
          </Typography>
          {token && (
            <Fragment>
              <IconButton>email_icon</IconButton>
              <Notifications />
              <Account />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({ myUser: getMyUser });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { logout, removeNotification },
  ),
  withStyles(styles),
)(Header);
