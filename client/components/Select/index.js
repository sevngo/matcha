import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  InputLabel,
  FormControl,
  Select as MSelect,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';
import messages from '../../utils/messages';

const Select = ({ field, meta: { error, isError }, label, children, className, ...rest }) => (
  <FormControl margin="dense" className={className} fullWidth error={isError} variant="outlined">
    <InputLabel>{label}</InputLabel>
    <MSelect input={<OutlinedInput labelWidth={65} />} {...field} {...rest}>
      {children}
    </MSelect>
    {isError && (
      <FormHelperText>
        <FormattedMessage {...messages[error]} />
      </FormHelperText>
    )}
  </FormControl>
);

export default withMetaData(Select);
