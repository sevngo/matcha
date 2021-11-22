import React, { Fragment, useEffect } from 'react';
import { isEmpty, split } from 'ramda';
import { Grid, IconButton, Paper, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
    isUserFriended,
    likeUser,
    dislikeUser,
    loadUser,
  } = useConnect();
  useEffect(() => {
    if (id !== userId) loadUser(id);
  }, [id, userId, loadUser]);
  const classes = useStyles();
  if (isEmpty(user) || userId !== id) return false;
  const birthDate = split('T')(user.birthDate)[0];
  return (
    <Grid container justifyContent="center" spacing={2} data-testid="otherUser">
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
                    <FormattedMessage {...messages.dislikeUser} />
                  )
                }
              >
                <IconButton
                  className={isUserLiked ? classes.red : ''}
                  onClick={() => (isUserLiked ? dislikeUser() : likeUser())}
                  data-testid={isUserLiked ? 'dislikeUser' : 'likeUser'}
                  size="large"
                >
                  <FavoriteIcon />
                </IconButton>
              </Tooltip>
              {isUserFriended && (
                <IconButton
                  color="primary"
                  data-testid="friend"
                  disabled
                  size="large"
                >
                  <DoneAllIcon />
                </IconButton>
              )}
            </Fragment>
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <Paper elevation={1} className={classes.p3}>
          <UserForm
            initialValues={{
              ...user,
              birthDate,
            }}
            readOnly
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default User;
