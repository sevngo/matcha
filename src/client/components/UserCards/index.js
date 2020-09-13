import React from 'react';
import Grid from '@material-ui/core/Grid';
import UserCard from '../UserCard';
import Grow from '@material-ui/core/Grow';

const UserCards = ({ users }) => (
  <Grid container justify="center" spacing={2}>
    {users.map((user, index) => (
      <Grow key={user._id} in={true} timeout={index * 200}>
        <Grid item>
          <UserCard user={user} />
        </Grid>
      </Grow>
    ))}
  </Grid>
);

export default UserCards;
