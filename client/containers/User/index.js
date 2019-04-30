import React, { useEffect, useState } from 'react';
import { compose, includes } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Paper, Grid, Button } from '@material-ui/core';
import MyUser from '../MyUser';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import withAuth from '../../hoc/withAuth';
import { loadUser, blockUser, unblockUser } from '../../actions';
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
  blockUser,
  unblockUser,
}) => {
  if (id === auth._id) return <MyUser />;
  const [activeStep, handleStep] = useState(0);
  useEffect(() => {
    loadUser(auth.token, id);
  }, []);
  const isBlocked = includes(user._id)(auth.usersBlockedIds);
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item className={classes.width}>
        <Paper elevation={24}>
          <Carousel
            userId={user._id}
            images={user.images}
            activeStep={activeStep}
            handleStep={handleStep}
          >
            {isBlocked ? (
              <Button
                variant="outlined"
                onClick={() => unblockUser(auth, user._id)}
                className={classes.unblock}
              >
                <FormattedMessage {...messages.unblockUser} />
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => blockUser(auth, user._id)}
                className={classes.block}
              >
                <FormattedMessage {...messages.blockUser} />
              </Button>
            )}
          </Carousel>
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
    { loadUser, blockUser, unblockUser },
  ),
  withAuth,
)(User);
