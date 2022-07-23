import DoneAllIcon from '@mui/icons-material/DoneAll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, IconButton, Paper, Tooltip } from '@mui/material';
import { isEmpty, split } from 'ramda';
import React, { Fragment, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import UserCard from '../../components/UserCard';
import UserForm from '../../components/UserForm';
import { useConnect } from './hooks';
import messages from './messages';

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
                  sx={{
                    color: (theme) =>
                      isUserLiked ? 'red' : theme.palette.grey,
                  }}
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
        <Paper elevation={1} sx={{ p: 3 }}>
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
