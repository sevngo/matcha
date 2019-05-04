import React from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withStyles, Paper, Grid } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import withoutAuth from '../../hoc/withoutAuth';
import { updateUser } from '../../actions/auth';
import styles from './styles';

const Reset = ({
  classes = {},
  match: {
    params: { token },
  },
  updateUser,
}) => {
  return (
    <Grid container justify="center" className={classes.p3}>
      <Paper elevation={24} className={classes.paper}>
        <UserForm initialValues={{ token, newPassword: '' }} submit={updateUser} />
      </Paper>
    </Grid>
  );
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { updateUser },
  ),
  withoutAuth,
)(Reset);
