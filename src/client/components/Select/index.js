import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select as MSelect,
} from '@material-ui/core';
import React from 'react';
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { formMessages } from '../../utils/messages';

const Select = ({ label, control, name, children, rules, ...rest }) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const error = fieldState.error?.type;
  return (
    <FormControl fullWidth error={Boolean(error)} variant="outlined">
      <InputLabel>{label}</InputLabel>
      <MSelect input={<OutlinedInput labelWidth={65} />} {...field} {...rest}>
        {children}
      </MSelect>
      {error && (
        <FormHelperText>
          <FormattedMessage {...formMessages[error]} />
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Select;
