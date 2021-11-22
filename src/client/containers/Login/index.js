import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm';
import { registerPath } from '../../utils';
import { initialValues, initialValuesEmail } from './constants';
import { useConnect } from './hooks';
import messages from './messages';
import useStyles from './styles';

const Login = () => {
  const { login, forgotPassword } = useConnect();
  const classes = useStyles();
  const [isDialogOpen, handleDialog] = useState(false);
  return (
    <Paper elevation={1} className={classes.paper} data-testid="loginForm">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h6">
        <FormattedMessage {...messages.login} />
      </Typography>
      <Box mt={3} />
      <UserForm initialValues={initialValues} submit={login} />
      <Grid container className={classes.mt2} justifyContent="space-between">
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
  );
};

export default Login;
