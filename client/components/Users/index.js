import React from 'react';
import { map } from 'ramda';
import Grid from '@material-ui/core/Grid';
import User from '../User';

const Component = ({ users }) => (
  <Grid container spacing={2} justify="center">
    {map(user => (
      <Grid item key={user._id}>
        <User user={user} />
      </Grid>
    ))(users)}
  </Grid>
);

// Component.defaultProps = {
//   users: [],
// };

export default Component;
