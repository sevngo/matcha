import React from 'react';
import Grid from '@material-ui/core/Grid';
import UserCard from '../UserCard';
import Grow from '@material-ui/core/Grow';

const UserCards = ({ users }) => (
  <Grid container spacing={2}>
    {users.map((user, index) => (
      <Grow key={user._id} in={true} timeout={index * 200}>
        <Grid item xs={12} sm={6} md={4}>
          <UserCard user={user} hasDistance />
        </Grid>
      </Grow>
    ))}
  </Grid>
);

export default React.memo(UserCards);
