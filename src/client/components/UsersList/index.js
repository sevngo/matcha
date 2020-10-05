import React, { memo } from 'react';
import { map, equals } from 'ramda';
import { Grid, Button, Typography, Divider, Paper } from '@material-ui/core';
import useStyles from './styles';

const UsersList = ({ users, title, actionMessage, action }) => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.p3}>
      <Typography variant="subtitle1" className={classes.subtitle}>
        {title}
      </Typography>
      <Divider className={classes.mt1} />
      {map((user) => (
        <Grid
          key={user._id}
          container
          justify="space-between"
          alignItems="center"
          className={classes.mt1}
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
};

export default memo(UsersList, equals);
