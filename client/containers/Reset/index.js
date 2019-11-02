import React from 'react';
import { Grid } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import { useConnect } from './hooks';
import useStyles from './styles';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const { updateUser } = useConnect();
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
