import React from 'react';
import Grid from '@mui/material/Grid';
import UserCard from '../UserCard';

const UserCards = ({ users }) => (
  <Grid container spacing={2} data-testid="userCards">
    {users.map((user, index) => (
      <Grid key={user._id} item xs={12} sm={6} md={4}>
        <UserCard user={user} hasDistance />
      </Grid>
    ))}
  </Grid>
);

export default React.memo(UserCards);
