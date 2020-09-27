import React, { Fragment, useEffect } from 'react';
import { find, isEmpty } from 'ramda';
import { Grid, IconButton, Paper, Grow, Tooltip } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import BlockIcon from '@material-ui/icons/Block';
import { FormattedMessage } from 'react-intl';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import UserCard from '../../components/UserCard';
import messages from './messages';
import { useConnect } from './hooks';

const User = ({ id }) => {
  const {
    user,
    usersLiked,
    usersBlocked,
    friends,
    likeUser,
    blockUser,
    loadUser,
  } = useConnect();
  useEffect(() => {
    if (id !== user._id) loadUser(id);
  }, [id, user._id, loadUser]);
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
                <Tooltip
                  title={
                    !isLiked ? <FormattedMessage {...messages.likeUser} /> : ''
                  }
                >
                  <IconButton
                    className={isLiked ? classes.red : ''}
                    onClick={likeUser}
                    disabled={isLiked}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    !isBlocked ? (
                      <FormattedMessage {...messages.blockUser} />
                    ) : (
                      ''
                    )
                  }
                >
                  <IconButton
                    className={isBlocked ? classes.red : ''}
                    onClick={blockUser}
                    disabled={isBlocked}
                  >
                    <BlockIcon />
                  </IconButton>
                </Tooltip>
                {isFriend && (
                  <IconButton color="primary" disabled>
                    <DoneAllIcon />
                  </IconButton>
                )}
              </Fragment>
            }
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
