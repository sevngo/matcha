import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { MenuItem, Menu } from '@material-ui/core';
import IconButton from '../../components/IconButton';
import { logout } from '../../actions';
import { userRoute } from '../../utils';
import { getMyUserId } from '../../selectors';

import messages from './messages.js';

const Account = () => {
  const [anchorEl, handleMenu] = useState();
  const _id = useSelector(getMyUserId);
  const dispatch = useDispatch();
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
