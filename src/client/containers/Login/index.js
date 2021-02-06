import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper,
  Typography,
  Link as MuiLink,
  Grid,
  Avatar,
  Grow,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import messages from './messages';
import { Link } from 'react-router-dom';
import { registerPath } from '../../utils';
import { useConnect } from './hooks';
import { initialValuesEmail, initialValues } from './constants';

const Login = () => {
  const { login, forgotPassword } = useConnect();
  const classes = useStyles();
  const [isDialogOpen, handleDialog] = useState(false);
  return (
    <Grow in={true} timeout={200}>
      <Paper elevation={1} className={classes.paper} data-testid="loginForm">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">
          <FormattedMessage {...messages.login} />
        </Typography>
        <Box mt={3} />
        <UserForm id="login" initialValues={initialValues} submit={login} />
        <Grid container className={classes.mt2} justify="space-between">
          <MuiLink
            variant="body2"
            className={classes.cursorPointer}
            onClick={() => handleDialog(true)}
            data-testid="forgotPasswordLink"
          >
            <FormattedMessage {...messages.forgotPassword} />
          </MuiLink>
          <Typography variant="body2" component={Link} to={registerPath}>
            <FormattedMessage {...messages.redirectToRegister} />
          </Typography>
        </Grid>
        <Dialog
          data-testid="forgotPasswordForm"
          open={isDialogOpen}
          onClose={() => handleDialog(false)}
        >
          <DialogTitle className={classes.dialogTitle}>
            <FormattedMessage {...messages.forgotPassword} />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormattedMessage {...messages.enterEmail} />
            </DialogContentText>
            <Box p={3}>
              <UserForm
                id="forgotPassword"
                initialValues={initialValuesEmail}
                submit={async (values) => {
                  await forgotPassword(values);
                  handleDialog(false);
                }}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </Grow>
  );
};

export default Login;
