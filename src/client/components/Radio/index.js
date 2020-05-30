import React from 'react';
import { FormattedMessage } from 'react-intl';
import { map } from 'ramda';
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio as MRadio,
} from '@material-ui/core';

const Radio = ({
  label,
  options,
  messages,
  disabled,
  error,
  className,
  ...rest
}) => (
  <FormControl error={Boolean(error)} className={className}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup row {...rest}>
      {map((option) => (
        <FormControlLabel
          key={option.id}
          value={option.value}
          control={<MRadio color="primary" />}
          label={<FormattedMessage {...messages[option.id]} />}
          disabled={disabled}
        />
      ))(options)}
    </RadioGroup>
  </FormControl>
);

export default Radio;
