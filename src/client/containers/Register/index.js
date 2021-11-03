import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Paper, Typography, Grid, Avatar, Grow } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import messages from './messages';
import { Link } from 'react-router-dom';
import { loginPath } from '../../utils';
import { useConnect } from './hooks';
import { initialValues } from './constants';

const Register = () => {
  const { register } = useConnect();
  const classes = useStyles();
  return (
    <Grow in={true} timeout={200}>
      <Paper elevation={1} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h6">
          <FormattedMessage {...messages.register} />
        </Typography>
        <Box mt={3} />
        <UserForm initialValues={initialValues} submit={register} />
        <Grid container className={classes.mt2} justifyContent="flex-end">
          <Typography variant="body2" component={Link} to={loginPath}>
            <FormattedMessage {...messages.redirectToLogin} />
          </Typography>
        </Grid>
      </Paper>
    </Grow>
  );
};

export default Register;
