import React, { Fragment, useEffect } from 'react';
import { isEmpty } from 'ramda';
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
    userId,
    isUserLiked,
    isUserBlocked,
    isUserFriended,
    likeUser,
    blockUser,
    loadUser,
  } = useConnect();
  useEffect(() => {
    if (id !== userId) loadUser(id);
  }, [id, userId, loadUser]);
  const classes = useStyles();
  if (isEmpty(user) || userId !== id) return false;
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
                    !isUserLiked ? (
                      <FormattedMessage {...messages.likeUser} />
                    ) : (
                      ''
                    )
                  }
                >
                  <IconButton
                    className={isUserLiked ? classes.red : ''}
                    onClick={likeUser}
                    disabled={isUserLiked}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    !isUserBlocked ? (
                      <FormattedMessage {...messages.blockUser} />
                    ) : (
                      ''
                    )
                  }
                >
                  <IconButton
                    className={isUserBlocked ? classes.red : ''}
                    onClick={blockUser}
                    disabled={isUserBlocked}
                  >
                    <BlockIcon />
                  </IconButton>
                </Tooltip>
                {isUserFriended && (
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
