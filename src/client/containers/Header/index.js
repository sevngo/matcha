import React, { useState, Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Drawer from '../Drawer';
import Account from '../Account';
import Notifications from '../Notifications';
import IconButton from '../../components/IconButton';
import { usersPath } from '../../utils';
import { useAuth } from '../../hooks';
import useStyles from './styles';
import messages from './messages';

const Header = () => {
  const classes = useStyles();
  const { isExact: isUsersPath } = useRouteMatch(usersPath);
  const { auth } = useAuth();
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const { token } = auth;
  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {isUsersPath && token ? (
            <IconButton onClick={() => toggleDrawer(true)} className={classes.icon}>
              menu
            </IconButton>
          ) : (
            <IconButton className={classes.icon} component={Link} to={usersPath}>
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

export default Header;
