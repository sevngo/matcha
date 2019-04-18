import React from 'react';
import { path, split } from 'ramda';
import { TextField, Icon, withStyles } from '@material-ui/core';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
});

const Component = ({
  field,
  form: { touched, errors },
  startAdornment,
  endAdornment,
  readOnly,
  classes,
  ...rest
}) => {
  const { name } = field;
  const names = split('.')(name);
  const isTouched = path(names)(touched);
  const error = path(names)(errors);
  return (
    <TextField
      margin="dense"
      variant="outlined"
      error={error && isTouched}
      helperText={isTouched && error}
      {...field}
      {...rest}
      InputProps={{
        startAdornment: startAdornment && <Icon className={classes.icon}>{startAdornment}</Icon>,
        endAdornment,
        readOnly,
      }}
    />
  );
};

export default withStyles(styles)(Component);
