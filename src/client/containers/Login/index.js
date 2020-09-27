import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { login, forgotPassword } from '../../actions';
import messages from './messages';
import { Link, Redirect } from 'react-router-dom';
import { registerPath, usersPath } from '../../utils';
import { getAuthToken } from '../../selectors';

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isDialogOpen, handleDialog] = useState(false);
  const token = useSelector(getAuthToken);
  const initialValues = {
    username: '',
    password: '',
  };
  if (token) return <Redirect to={usersPath} />;
  return (
    <Grow in={true} timeout={200}>
      <Paper elevation={1} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">
          <FormattedMessage {...messages.login} />
        </Typography>
        <Box mt={3} />
        <UserForm
          initialValues={initialValues}
          submit={(values) => dispatch(login(values))}
        />
        <Grid container className={classes.mt2} justify="space-between">
          <MuiLink
            variant="body2"
            className={classes.cursorPointer}
            onClick={() => handleDialog(true)}
          >
            <FormattedMessage {...messages.forgotPassword} />
          </MuiLink>
          <Typography variant="body2" component={Link} to={registerPath}>
            <FormattedMessage {...messages.redirectToRegister} />
          </Typography>
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
      </Paper>
    </Grow>
  );
};

export default Login;
