import React from 'react';
import { RadioGroup, FormControl, FormLabel } from '@material-ui/core';

const Component = ({ field, form: { touched, errors }, label, children, ...rest }) => {
  const { name } = field;
  return (
    <FormControl error={errors[name] && touched[name]}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row {...field} {...rest}>
        {children}
      </RadioGroup>
    </FormControl>
  );
};

export default Component;
