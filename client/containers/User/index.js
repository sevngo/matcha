import React, { useEffect, useState } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withStyles, Paper, Grid } from '@material-ui/core';
import MyUser from '../MyUser';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import withAuth from '../../hoc/withAuth';
import { loadUser } from '../../actions';
import { getUser, getAuth } from '../../selectors';
import styles from './styles';

const Component = ({
  user,
  classes,
  loadUser,
  match: {
    params: { id },
  },
  auth,
}) => {
  if (id === auth._id) return <MyUser />;
  const [activeStep, handleStep] = useState(0);
  useEffect(() => {
    loadUser(auth.token, id);
  }, []);
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item className={classes.width}>
        <Paper elevation={24}>
          <Carousel
            userId={user._id}
            images={user.images}
            activeStep={activeStep}
            handleStep={handleStep}
          />
        </Paper>
      </Grid>
      <Grid item className={classes.width}>
        <Paper elevation={24} className={classes.p3}>
          <UserForm initialValues={user} disabled />
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUser },
  ),
  withAuth,
)(Component);
