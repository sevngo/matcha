import React from 'react';
import { map } from 'ramda';
import { Grid } from '@material-ui/core';
import Interest from '../Interest';

const Component = ({ interests }) => (
  <Grid container spacing={1}>
    {map(interest => (
      <Grid item key={interest}>
        <Interest key={interest} interest={interest} />
      </Grid>
    ))(interests)}
  </Grid>
);

Component.defaultProps = {
  interests: [],
};

export default Component;
