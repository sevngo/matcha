import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import { useConnect } from './hooks';
import { initialValues } from './constants';
import { usersPath } from '../../utils';
import { Redirect } from 'react-router';

const Reset = () => {
  const { isAuthEmpty, updateUser } = useConnect();
  const classes = useStyles();
  if (!isAuthEmpty) return <Redirect to={usersPath} />;
  return (
    <Grid container justify="center" className={classes.p3}>
      <Paper elevation={1} className={classes.paper}>
        <UserForm
          initialValues={initialValues}
          submit={updateUser}
          newPasswordLabel
        />
      </Paper>
    </Grid>
  );
};

export default Reset;
