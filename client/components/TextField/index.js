import React from 'react';
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
  return (
    <TextField
      margin="dense"
      variant="outlined"
      error={errors[name] && touched[name]}
      helperText={touched[name] && errors[name]}
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
