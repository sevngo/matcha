import React from 'react';
import TextField from '@material-ui/core/TextField';
import Icon from '../Icon';

export default ({
  field,
  form: { touched, errors },
  startAdornment,
  endAdornment,
  readOnly,
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
        startAdornment: startAdornment && (
          <Icon color="inherit" disableRipple>
            {startAdornment}
          </Icon>
        ),
        endAdornment,
        readOnly,
      }}
    />
  );
};
