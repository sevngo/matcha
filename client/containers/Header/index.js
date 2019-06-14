import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Drawer from '../Drawer';
import Account from '../Account';
import Notifications from '../Notifications';
import IconButton from '../../components/IconButton';
import { logout, removeNotification } from '../../actions';
import { getToken } from '../../selectors';
import { homeRoute } from '../../utils';
import useStyles from './styles';
import messages from './messages';

const Header = ({ location: { pathname } }) => {
  const classes = useStyles();
  const token = useSelector(getToken);
  const [isDrawerOpen, toggleDrawer] = useState(false);
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

export default compose(
  withRouter,
  connect(
    null,
    { logout, removeNotification },
  ),
)(Header);
