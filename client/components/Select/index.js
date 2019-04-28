import React from 'react';
import {
  InputLabel,
  FormControl,
  Select as MSelect,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';

const Select = ({ field, meta: { error, isError }, label, children, className, ...rest }) => (
  <FormControl margin="dense" className={className} fullWidth error={isError} variant="outlined">
    <InputLabel>{label}</InputLabel>
    <MSelect input={<OutlinedInput labelWidth={65} />} {...field} {...rest}>
      {children}
    </MSelect>
    {isError && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

export default withMetaData(Select);
