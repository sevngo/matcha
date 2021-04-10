import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio as MRadio,
  RadioGroup,
} from '@material-ui/core';
import { map } from 'ramda';
import React from 'react';
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { formMessages } from '../../utils/messages';

const Radio = ({
  name,
  control,
  readOnly,
  messages,
  options,
  label,
  rules,
  ...rest
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = fieldState.error?.type;
  return (
    <FormControl error={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row {...field} {...rest}>
        {map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={<MRadio color="primary" />}
            label={<FormattedMessage {...messages[option.id]} />}
            disabled={field.value !== option.value && readOnly}
          />
        ))(options)}
      </RadioGroup>
      {error && (
        <FormHelperText>
          <FormattedMessage {...formMessages[error]} />
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Radio;
