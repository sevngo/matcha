import React from 'react';
import { compose } from 'ramda';
import { Paper, Grid } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import withoutAuth from '../../hoc/withoutAuth';
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
      <Paper elevation={24} className={classes.paper}>
        <UserForm initialValues={{ token, newPassword: '' }} submit={updateUser} />
      </Paper>
    </Grid>
  );
};

export default compose(withoutAuth)(Reset);
