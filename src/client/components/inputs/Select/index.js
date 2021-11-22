import { FormControl, InputLabel, Select as MSelect } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const Select = ({ label, control, name, children, rules, ...rest }) => {
  const { field } = useController({
    name,
    control,
    rules,
  });
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <MSelect label={label} {...field} {...rest}>
        {children}
      </MSelect>
    </FormControl>
  );
};

export default Select;
