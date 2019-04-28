import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { AppBar, Toolbar, Typography, withStyles, MenuItem, Menu } from '@material-ui/core';
import Drawer from '../Drawer';
import IconButton from '../../components/IconButton';
import { logout } from '../../actions';
import { getAuth } from '../../selectors';
import styles from './styles';
import messages from './messages';

const Header = ({ classes, auth, logout, location: { pathname } }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [anchorEl, handleMenu] = useState();
  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {pathname === '/' && !isEmpty(auth) ? (
            <IconButton onClick={() => toggleDrawer(true)} className={classes.icon}>
              menu
            </IconButton>
          ) : (
            <IconButton className={classes.icon} component={Link} to="/">
              accessibility_new
            </IconButton>
          )}
          <Typography variant="h6" color="secondary" className={classes.title}>
            <FormattedMessage {...messages.title} />
          </Typography>
          {!isEmpty(auth) && (
            <Fragment>
              <IconButton>email_icon</IconButton>
              <IconButton>notifications_icon</IconButton>
              <IconButton onClick={e => handleMenu(e.currentTarget)}>account_circle</IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenu()}>
                <MenuItem onClick={() => handleMenu()} component={Link} to={`/user/${auth._id}`}>
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

const mapStateToProps = createStructuredSelector({ auth: getAuth });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    { logout },
  ),
  withStyles(styles),
)(Header);
