import React from 'react';
import { InputLabel, FormControl, Select, FormHelperText, OutlinedInput } from '@material-ui/core';

const Component = ({
  field,
  form: { touched, errors },
  label,
  fullWidth,
  children,
  className,
  ...rest
}) => {
  const { name } = field;
  const isError = errors[name] && touched[name] ? true : false;
  return (
    <FormControl
      margin="dense"
      className={className}
      fullWidth={fullWidth}
      error={isError}
      variant="outlined"
    >
      <InputLabel>{label}</InputLabel>
      <Select input={<OutlinedInput labelWidth={65} />} {...field} {...rest}>
        {children}
      </Select>
      {isError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default Component;
