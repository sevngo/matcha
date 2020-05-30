import React from 'react';
import { map } from 'ramda';
import Grid from '@material-ui/core/Grid';
import UserCard from '../UserCard';

const UserCards = ({ users }) => (
  <Grid container spacing={2}>
    {map((user) => (
      <Grid item key={user._id}>
        <UserCard user={user} />
      </Grid>
    ))(users)}
  </Grid>
);

export default UserCards;
