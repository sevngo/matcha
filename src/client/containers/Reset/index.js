import React from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import { useAuth } from '../../hooks';
import useStyles from './styles';

const Reset = () => {
  const { token } = useParams();
  const { updateUser } = useAuth();
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.p3}>
      <Paper className={classes.paper}>
        <UserForm initialValues={{ newPassword: '' }} submit={user => updateUser(token, user)} />
      </Paper>
    </Grid>
  );
};

export default Reset;
