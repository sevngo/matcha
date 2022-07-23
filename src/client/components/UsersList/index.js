import React, { memo } from 'react';
import { map, equals } from 'ramda';
import { Grid, Button, Typography, Divider, Paper } from '@mui/material';

const UsersList = ({ users, title, actionMessage, action }) => (
  <Paper elevation={1} sx={{ p: 3 }}>
    <Typography variant="h6">{title}</Typography>
    <Divider sx={{ mt: 1 }} />
    {map((user) => (
      <Grid
        key={user._id}
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Typography>{user.username}</Typography>
        <Button
          variant="outlined"
          onClick={() => action(user._id)}
          color="primary"
        >
          {actionMessage}
        </Button>
      </Grid>
    ))(users)}
  </Paper>
);

export default memo(UsersList, equals);
