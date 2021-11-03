import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select as MSelect,
} from '@material-ui/core';
import React from 'react';
import { useController } from 'react-hook-form';

const Select = ({ label, control, name, children, rules, ...rest }) => {
  const { field } = useController({
    name,
    control,
    rules,
  });
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <MSelect input={<OutlinedInput labelWidth={65} />} {...field} {...rest}>
        {children}
      </MSelect>
    </FormControl>
  );
};

export default Select;
