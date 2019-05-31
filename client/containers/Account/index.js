import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { MenuItem, Menu } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import IconButton from '../../components/IconButton';
import { logout } from '../../actions';
import { userRoute } from '../../utils';
import { getMyUser } from '../../selectors';

import messages from './messages.js';

const Account = ({ logout, myUser: { _id } }) => {
  const [anchorEl, handleMenu] = useState();
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

const mapStateToProps = createStructuredSelector({ myUser: getMyUser });

export default compose(
  connect(
    mapStateToProps,
    { logout },
  ),
)(Account);
