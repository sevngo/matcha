import React from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Box, Paper, Typography, Grid, Avatar, Grow } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import { register } from '../../actions';
import messages from './messages';
import { Link } from 'react-router-dom';
import { loginPath } from '../../utils';

const Register = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const initialValues = {
    username: '',
    password: '',
    email: '',
    gender: '',
    birthDate: '',
    address: { name: '' },
  };
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
        <UserForm
          initialValues={initialValues}
          submit={(values) => dispatch(register(values))}
        />
        <Grid container className={classes.mt2} justify="flex-end">
          <Typography variant="body2" component={Link} to={loginPath}>
            <FormattedMessage {...messages.redirectToLogin} />
          </Typography>
        </Grid>
      </Paper>
    </Grow>
  );
};

export default Register;
