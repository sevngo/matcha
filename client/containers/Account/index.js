import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { MenuItem, Menu } from '@material-ui/core';
import IconButton from '../../components/IconButton';
import { useConnect } from './hooks';
import { userPath } from '../../utils';
import messages from './messages.js';

const Account = () => {
  const [anchorEl, handleMenu] = useState();
  const { _id, logout } = useConnect();
  return (
    <Fragment>
      <IconButton onClick={e => handleMenu(e.currentTarget)}>account_circle</IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenu()}>
        <MenuItem onClick={() => handleMenu()} component={Link} to={userPath(_id)}>
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
