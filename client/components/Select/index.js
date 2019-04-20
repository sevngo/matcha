import React from 'react';
import { InputLabel, FormControl, Select, FormHelperText, OutlinedInput } from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';

const Component = ({
  field,
  meta: { error, isError },
  label,
  fullWidth,
  children,
  className,
  ...rest
}) => (
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
    {isError && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default withMetaData(Component);
