import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '../IconButton';

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
          <IconButton color="inherit" disableRipple>
            {startAdornment}
          </IconButton>
        ),
        endAdornment,
        readOnly,
      }}
    />
  );
};
