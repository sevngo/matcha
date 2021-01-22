import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { MenuItem, Menu, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userPath } from '../../utils';
import messages from './messages.js';
import { getAuthId } from '../../selectors';
import { logout } from '../../actions';

const Account = () => {
  const [anchorEl, handleMenu] = useState();
  const dispatch = useDispatch();
  const authId = useSelector(getAuthId);
  return (
    <Fragment>
      <IconButton
        data-testid="accountButton"
        color="inherit"
        onClick={(e) => handleMenu(e.currentTarget)}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        data-testid="accountMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenu()}
      >
        <MenuItem
          onClick={() => handleMenu()}
          component={Link}
          to={userPath(authId)}
        >
          <FormattedMessage {...messages.myAccount} />
        </MenuItem>
        <MenuItem
          data-testid="logout"
          onClick={() => {
            handleMenu();
            dispatch(logout());
          }}
        >
          <FormattedMessage {...messages.logout} />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Account;
