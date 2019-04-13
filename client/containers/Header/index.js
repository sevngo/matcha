import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose, isEmpty } from 'ramda';
import { AppBar, Toolbar, Typography, withStyles, MenuItem, Menu } from '@material-ui/core';
import Drawer from '../Drawer';
import IconButton from '../../components/IconButton';
import { logout } from '../../actions';
import { getAuth } from '../../selectors';
import * as constants from '../../utils/constants';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(4),
  },
});

const Component = ({ classes, auth, logout, location: { pathname } }) => {
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const [anchorEl, handleMenu] = useState(null);
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
            {constants.title}
          </Typography>
          {!isEmpty(auth) && (
            <Fragment>
              <IconButton>email_icon</IconButton>
              <IconButton>notifications_icon</IconButton>
              <IconButton onClick={e => handleMenu(e.currentTarget)}>account_circle</IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenu(null)}>
                <MenuItem
                  onClick={() => handleMenu(null)}
                  component={Link}
                  to={`/user/${auth._id}`}
                >
                  {constants.myAccount}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenu(null);
                    logout();
                  }}
                >
                  {constants.logout}
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

const mapDispatchToProps = state => ({ auth: getAuth(state) });

export default compose(
  withRouter,
  connect(
    mapDispatchToProps,
    { logout },
  ),
  withStyles(styles),
)(Component);
