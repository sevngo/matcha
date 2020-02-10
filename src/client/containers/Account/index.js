import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { MenuItem, Menu, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useAuth } from '../../hooks';
import { userPath } from '../../utils';
import messages from './messages.js';

const Account = () => {
  const [anchorEl, handleMenu] = useState();
  const { auth, logout } = useAuth();
  return (
    <Fragment>
      <IconButton color="inherit" onClick={e => handleMenu(e.currentTarget)}>
        <AccountCircleIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenu()}>
        <MenuItem onClick={() => handleMenu()} component={Link} to={userPath(auth._id)}>
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
  );
};

export default Account;
