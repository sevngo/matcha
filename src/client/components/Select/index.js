import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  InputLabel,
  FormControl,
  Select as MSelect,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import messages from './messages';

const Select = ({ field, error, label, children, className, ...rest }) => (
  <FormControl
    className={className}
    fullWidth
    error={Boolean(error)}
    variant="outlined"
  >
    <InputLabel>{label}</InputLabel>
    <MSelect input={<OutlinedInput labelWidth={65} />} {...field} {...rest}>
      {children}
    </MSelect>
    {error && (
      <FormHelperText>
        <FormattedMessage {...messages[error]} />
      </FormHelperText>
    )}
  </FormControl>
);

export default Select;
