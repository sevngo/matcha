import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { MenuItem, Menu, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userPath } from '../../utils';
import messages from './messages.js';
import { getAuthId } from '../../store/auth/selectors';
import { logout } from '../../store/auth/actions';

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
        size="large"
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
          data-testid="goToMyUser"
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
