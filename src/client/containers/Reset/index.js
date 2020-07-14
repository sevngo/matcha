import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { useParams } from 'react-router';
import UserForm from '../../components/UserForm';
import { updateUser } from '../../actions';
import useStyles from './styles';

const Reset = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.p3}>
      <Paper elevation={1} className={classes.paper}>
        <UserForm
          initialValues={{ password: '' }}
          submit={(user) => dispatch(updateUser(user, token))}
          newPasswordLabel
        />
      </Paper>
    </Grid>
  );
};

export default Reset;
