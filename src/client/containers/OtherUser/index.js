import React, { useEffect, useState } from 'react';
import { find, path, isEmpty, length } from 'ramda';
import { Grid, Box } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import IconButton from '../../components/IconButton';
import emptyImage from '../../images/emptyImage.png';
import { getUserImage } from '../../api';
import useStyles from './styles';
import { useUser, useRelations } from '../../hooks';

const User = ({ id }) => {
  const { user, loadUser } = useUser();
  const { likeUser, blockUser, usersLiked, usersBlocked, friends } = useRelations();
  const [activeStep, handleStep] = useState(0);
  useEffect(() => {
    loadUser(id);
  }, [id, loadUser]);
  const classes = useStyles();
  const isLiked = Boolean(find(userLiked => userLiked._id === user._id)(usersLiked));
  const isBlocked = Boolean(find(userBlocked => userBlocked._id === user._id)(usersBlocked));
  const isFriend = find(friend => friend._id === user._id)(friends);
  const { images = [] } = user;
  const image = !isEmpty(images)
    ? getUserImage(user._id, path([activeStep, '_id'])(images))
    : emptyImage;
  const maxSteps = length(images);
  return (
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item className={classes.mw30}>
          <Paper>
            <Carousel activeStep={activeStep} handleStep={handleStep} maxSteps={maxSteps}>
              <Box p={1} bgcolor="background.default">
                <IconButton
                  className={isLiked ? classes.red : ''}
                  onClick={() => likeUser(user._id)}
                  disabled={isLiked}
                >
                  favorite
                </IconButton>
                <IconButton
                  className={isBlocked ? classes.red : ''}
                  onClick={() => blockUser(user._id)}
                  disabled={isBlocked}
                >
                  block
                </IconButton>
                {isFriend && (
                  <IconButton color="primary" disabled>
                    done_all
                  </IconButton>
                )}
              </Box>
              <img className={classes.img} src={image} alt="profile" />
            </Carousel>
          </Paper>
        </Grid>
        <Grid item className={classes.mw30}>
          <Paper className={classes.p3}>
            <UserForm initialValues={user} disabled />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default User;
