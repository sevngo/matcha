import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import { useConnect } from './hooks';
import { initialValues } from './constants';

const Reset = () => {
  const { updateUser } = useConnect();
  const classes = useStyles();
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
