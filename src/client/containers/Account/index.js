import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { MenuItem, Menu, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userPath } from '../../utils/routes';
import messages from './messages.js';
import { getAuth } from '../../selectors';
import { logout } from '../../actions';

const Account = () => {
  const [anchorEl, handleMenu] = useState();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
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
          to={userPath(auth._id)}
        >
          <FormattedMessage {...messages.myAccount} />
        </MenuItem>
        <MenuItem
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
