import React, { useEffect, useState } from 'react';
import { find } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, Grid, Button } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import useStyles from './styles';
import { useConnect } from './hooks';
import messages from './messages';

const User = ({ id }) => {
  const { user, myUser, loadUser, likeUser, blockUser } = useConnect();
  const [activeStep, handleStep] = useState(0);
  useEffect(() => {
    loadUser(myUser, id);
  }, []);
  const classes = useStyles();
  const isLiked = Boolean(find(userLiked => userLiked._id === user._id)(myUser.usersLiked));
  const isBlocked = Boolean(find(userBlocked => userBlocked._id === user._id)(myUser.usersBlocked));
  const isFriend = find(friend => friend._id === user._id)(myUser.friends);
  return (
    <Grid container justify="center" spacing={2} className={classes.p3}>
      {isFriend && (
        <Grid item xs={12} className={classes.width}>
          <Button color="primary" variant="contained" size="large" className={classes.friend}>
            <FormattedMessage {...messages.friend} />
          </Button>
        </Grid>
      )}
      <Grid item xs={12} className={classes.width}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          className={classes.like}
          onClick={() => likeUser(myUser, user._id)}
          disabled={isLiked}
        >
          <FormattedMessage {...messages.likeUser} />
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.width}>
        <Button
          size="large"
          variant="contained"
          onClick={() => blockUser(myUser, user._id)}
          className={classes.block}
          disabled={isBlocked}
        >
          <FormattedMessage {...messages.blockUser} />
        </Button>
      </Grid>
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

export default User;
