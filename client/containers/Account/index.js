import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { MenuItem, Menu } from '@material-ui/core';
import IconButton from '../../components/IconButton';
import { getMyUserId } from '../../selectors';
import { userRoute } from '../../utils';
import { useMyDispatch } from '../../hooks';
import messages from './messages.js';

const Account = () => {
  const [anchorEl, handleMenu] = useState();
  const _id = useSelector(getMyUserId);
  const { logout } = useMyDispatch();
  return (
    <Fragment>
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
  );
};

export default Account;
