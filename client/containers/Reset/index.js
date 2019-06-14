import React from 'react';
import { compose } from 'ramda';
import { useDispatch } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import withoutAuth from '../../hoc/withoutAuth';
import { updateUser } from '../../actions/myUser';
import useStyles from './styles';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.p3}>
      <Paper elevation={24} className={classes.paper}>
        <UserForm
          initialValues={{ token, newPassword: '' }}
          submit={updateUser}
          dispatch={dispatch}
        />
      </Paper>
    </Grid>
  );
};

export default compose(withoutAuth)(Reset);
