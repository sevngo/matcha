import React from 'react';
import { isEmpty } from 'ramda';
import { Typography } from '@material-ui/core';
import IconButton from '../../components/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { variantIcon } from './constants';
import useStyles from './styles';
import { useSnackbar } from '../../hooks';

const MySnackbar = () => {
  const { snackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const isSnackbarOpen = !isEmpty(snackbar);
  if (!isSnackbarOpen) return false;
  const variant = snackbar.variant;
  const message = '';
  const Icon = variantIcon[variant];
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open
      autoHideDuration={2000}
      onClose={closeSnackbar}
    >
      <SnackbarContent
        className={classes[variant]}
        message={
          <Typography variant="body2" className={classes.message}>
            <Icon className={classes.iconVariant} />
            {message}
          </Typography>
        }
        action={[
          <IconButton key="close" color="inherit" onClick={closeSnackbar}>
            close_icon
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default MySnackbar;