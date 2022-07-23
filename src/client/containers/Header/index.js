import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Account from '../Account';
import Notifications from '../Notifications';
import { usersPath } from '../../utils';
import messages from './messages';
import { getAuthToken } from '../../store/auth/selectors';

const Header = (props) => {
  const token = useSelector(getAuthToken);
  return (
    <Fragment>
      <AppBar
        position="static"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            sx={{ mr: 1 }}
            component={Link}
            to={usersPath}
            size="large"
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            <FormattedMessage {...messages.title} />
          </Typography>
          {token && (
            <Fragment>
              <Notifications />
              <Account />
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
