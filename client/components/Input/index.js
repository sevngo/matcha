import React from 'react';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { TextField, Icon, withStyles } from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';
import styles from './styles';
import messages from './messages';

const Input = ({
  field,
  meta: { error, isError },
  startAdornment,
  endAdornment,
  readOnly,
  classes,
  ...rest
}) => (
  <TextField
    margin="dense"
    variant="outlined"
    error={isError}
    helperText={isError && <FormattedMessage {...messages[error]} />}
    fullWidth
    InputProps={{
      startAdornment: startAdornment && <Icon className={classes.icon}>{startAdornment}</Icon>,
      endAdornment,
      readOnly,
    }}
    {...field}
    {...rest}
  />
);

export default compose(
  withStyles(styles),
  withMetaData,
)(Input);
