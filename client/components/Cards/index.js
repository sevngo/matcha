import React from 'react';
import { map } from 'ramda';
import Grid from '@material-ui/core/Grid';
import Card from '../Card';

const Cards = ({ users }) => (
  <Grid container spacing={2} justify="center">
    {map(user => (
      <Grid item key={user._id}>
        <Card user={user} />
      </Grid>
    ))(users)}
  </Grid>
);

export default Cards;
