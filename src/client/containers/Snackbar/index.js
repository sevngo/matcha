import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { isEmpty } from 'ramda';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../../store/snackbar/actions';
import { getSnackbar } from '../../store/snackbar/selectors';
import { variantIcon, variantColor } from './utils';

const MySnackbar = () => {
  const snackbar = useSelector(getSnackbar);
  const dispatch = useDispatch();
  const isSnackbarOpen = !isEmpty(snackbar);
  if (!isSnackbarOpen) return false;
  const { variant, message } = snackbar;
  const Icon = variantIcon[variant];
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open
      autoHideDuration={5000}
      onClose={() => dispatch(closeSnackbar())}
      data-testid="snackbar"
    >
      <SnackbarContent
        sx={variantColor(variant)}
        message={
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon sx={{ opacity: 0.9, mr: 1 }} />
            {message}
          </Typography>
        }
        action={[
          <IconButton
            data-testid="closeSnackbar"
            key="close"
            color="inherit"
            onClick={() => dispatch(closeSnackbar())}
            size="large"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default MySnackbar;
