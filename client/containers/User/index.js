import React, { useEffect } from 'react';
import { compose, omit } from 'ramda';
import { connect } from 'react-redux';
import { withStyles, Paper, Grid } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import withAuth from '../../hoc/withAuth';
import { loadUser, updateAccount } from '../../actions';
import { getUser, getAuth } from '../../selectors';

const styles = theme => ({
  p3: {
    padding: theme.spacing(3),
  },
  width: {
    maxWidth: 500,
  },
});

const Component = ({
  user,
  classes,
  match: {
    params: { id },
  },
  loadUser,
  auth,
  updateAccount,
}) => {
  const isMyAccount = id === auth._id;
  if (!isMyAccount)
    useEffect(() => {
      loadUser(id);
    }, []);
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={24}>{!isMyAccount && <Carousel images={user.images} />}</Paper>
      </Grid>
      <Grid item xs={12} md={6} className={classes.width}>
        <Paper elevation={24} className={classes.p3}>
          {isMyAccount ? (
            <UserForm
              initialValues={{
                interests: [],
                biography: '',
                ...omit(['_id', 'token'])(auth),
                newPassword: '',
              }}
              newPassword={isMyAccount}
              submit={updateAccount}
            />
          ) : (
            <UserForm initialValues={user} readOnly />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

Component.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUser, updateAccount },
  ),
  withAuth,
)(Component);
