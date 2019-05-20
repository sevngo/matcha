import React, { useEffect, useState } from 'react';
import { compose, find } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Paper, Grid, Button } from '@material-ui/core';
import MyUser from '../MyUser';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import withAuth from '../../hoc/withAuth';
import { loadUser, likeUser, blockUser } from '../../actions';
import { getUser, getAuth } from '../../selectors';
import styles from './styles';
import messages from './messages';

const User = ({
  user,
  classes,
  loadUser,
  match: {
    params: { id },
  },
  auth,
  likeUser,
  blockUser,
}) => {
  if (id === auth._id) return <MyUser />;
  const [activeStep, handleStep] = useState(0);
  useEffect(() => {
    loadUser(auth.token, id);
  }, []);
  const isLiked = find(userLiked => userLiked._id === user._id)(auth.usersLiked);
  const isBlocked = find(userBlocked => userBlocked._id === user._id)(auth.usersBlocked);
  return (
    <Grid container justify="center" spacing={2} className={classes.p3}>
      {!isLiked && (
        <Grid item xs={12} className={classes.width}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.like}
            onClick={() => likeUser(auth, user._id)}
          >
            <FormattedMessage {...messages.likeUser} />
          </Button>
        </Grid>
      )}
      {!isBlocked && (
        <Grid item xs={12} className={classes.width}>
          <Button
            size="large"
            variant="contained"
            onClick={() => blockUser(auth, user._id)}
            className={classes.block}
          >
            <FormattedMessage {...messages.blockUser} />
          </Button>
        </Grid>
      )}
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

const mapStateToProps = createStructuredSelector({
  user: getUser,
  auth: getAuth,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUser, likeUser, blockUser },
  ),
  withAuth,
)(User);
