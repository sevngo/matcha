import React, { Fragment, useEffect } from 'react';
import { find, isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, IconButton, Paper, Grow } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import BlockIcon from '@material-ui/icons/Block';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import { loadUser, likeUser, blockUser } from '../../actions';
import {
  getUser,
  getUsersLiked,
  getUsersBlocked,
  getFriends,
} from '../../selectors';
import UserCard from '../../components/UserCard';

const User = ({ id }) => {
  const user = useSelector(getUser);
  const usersLiked = useSelector(getUsersLiked);
  const usersBlocked = useSelector(getUsersBlocked);
  const friends = useSelector(getFriends);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id !== user._id) dispatch(loadUser(id));
  }, [dispatch, id, user._id]);
  const classes = useStyles();
  const isLiked = Boolean(
    find((userLiked) => userLiked._id === user._id)(usersLiked)
  );
  const isBlocked = Boolean(
    find((userBlocked) => userBlocked._id === user._id)(usersBlocked)
  );
  const isFriend = find((friend) => friend._id === user._id)(friends);
  if (isEmpty(user) || user._id !== id) return false;
  return (
    <Grid container justify="center" spacing={2}>
      <Grow in={true} timeout={200}>
        <Grid item xs={12} sm={6} md={7}>
          <UserCard
            user={user}
            actions={
              <Fragment>
                <IconButton
                  className={isLiked ? classes.red : ''}
                  onClick={() => dispatch(likeUser(user._id))}
                  disabled={isLiked}
                >
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  className={isBlocked ? classes.red : ''}
                  onClick={() => dispatch(blockUser(user._id))}
                  disabled={isBlocked}
                >
                  <BlockIcon />
                </IconButton>
                {isFriend && (
                  <IconButton color="primary" disabled>
                    <DoneAllIcon />
                  </IconButton>
                )}
              </Fragment>
            }
            hasBiodescription
          />
        </Grid>
      </Grow>
      <Grow in={true} timeout={400}>
        <Grid item xs={12} sm={6} md={5}>
          <Paper elevation={1} className={classes.p3}>
            <UserForm initialValues={user} disabled />
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default User;
