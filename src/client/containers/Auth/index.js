import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper,
  Typography,
  Link,
  Grid,
  Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import { login, forgotPassword, register } from '../../actions';
import messages from './messages';

const Auth = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isDialogOpen, handleDialog] = useState(false);
  const [tab, handleTab] = useState(0);
  const initialValues = {
    username: '',
    password: '',
  };
  return (
    <Paper elevation={1} className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h6">
        {tab === 0 ? (
          <FormattedMessage {...messages.login} />
        ) : (
          <FormattedMessage {...messages.register} />
        )}
      </Typography>
      <Box mt={3} />
      {tab === 0 ? (
        <Fragment>
          <UserForm
            initialValues={initialValues}
            submit={(values) => dispatch(login(values))}
          />
          <Grid container className={classes.mt2} justify="space-between">
            <Link href="#" variant="body1" onClick={() => handleDialog(true)}>
              <FormattedMessage {...messages.forgotPassword} />
            </Link>
            <Link href="#" variant="body1" onClick={() => handleTab(1)}>
              <FormattedMessage {...messages.register} />
            </Link>
          </Grid>
          <Dialog open={isDialogOpen} onClose={() => handleDialog(false)}>
            <DialogTitle className={classes.dialogTitle}>
              <FormattedMessage {...messages.forgotPassword} />
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <FormattedMessage {...messages.enterEmail} />
              </DialogContentText>
              <Box p={3}>
                <UserForm
                  initialValues={{ email: '' }}
                  submit={(values) => dispatch(forgotPassword(values))}
                />
              </Box>
            </DialogContent>
          </Dialog>
        </Fragment>
      ) : (
        <Fragment>
          <UserForm
            initialValues={{
              ...initialValues,
              email: '',
              gender: '',
              birthDate: '',
              address: { name: '' },
            }}
            submit={(values) => dispatch(register(values))}
            isGeoActivated
          />
          <Grid container className={classes.mt2} justify="flex-end">
            <Link href="#" variant="body1" onClick={() => handleTab(0)}>
              <FormattedMessage {...messages.login} />
            </Link>
          </Grid>
        </Fragment>
      )}
    </Paper>
  );
};

export default Auth;
