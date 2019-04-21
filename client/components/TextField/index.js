import React from 'react';
import { compose } from 'ramda';
import { TextField, Icon, withStyles } from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';

const styles = theme => ({
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
  },
});

const Component = ({
  field,
  meta: { error, isError },
  startAdornment,
  endAdornment,
  readOnly,
  classes,
  ...rest
}) => (
  <TextField
    margin="dense"
    variant="outlined"
    error={isError}
    helperText={isError && error}
    fullWidth
    InputProps={{
      startAdornment: startAdornment && <Icon className={classes.icon}>{startAdornment}</Icon>,
      endAdornment,
      readOnly,
    }}
    {...field}
    {...rest}
  />
);

export default compose(
  withStyles(styles),
  withMetaData,
)(Component);
