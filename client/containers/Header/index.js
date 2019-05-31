import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, Typography, withStyles, MenuItem, Menu } from '@material-ui/core';
import Drawer from '../Drawer';
import IconButton from '../../components/IconButton';
import { logout } from '../../actions';
import { getMyUser } from '../../selectors';
import { homeRoute, userRoute } from '../../utils';
import styles from './styles';
import messages from './messages';

const Header = ({ classes, myUser, logout, location: { pathname } }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [anchorEl, handleMenu] = useState();
  const { token, _id } = myUser;
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
          <Typography variant="h6" color="secondary" className={classes.title}>
            <FormattedMessage {...messages.title} />
          </Typography>
          {token && (
            <Fragment>
              <IconButton>email_icon</IconButton>
              <IconButton>notifications_icon</IconButton>
              <IconButton onClick={e => handleMenu(e.currentTarget)}>account_circle</IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenu()}>
                <MenuItem onClick={() => handleMenu()} component={Link} to={userRoute(_id)}>
                  <FormattedMessage {...messages.myAccount} />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenu();
                    logout();
                  }}
                >
                  <FormattedMessage {...messages.logout} />
                </MenuItem>
              </Menu>
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
    { logout },
  ),
  withStyles(styles),
)(Header);
