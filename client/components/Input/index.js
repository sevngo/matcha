import React from 'react';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { TextField, Icon } from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';
import useStyles from './styles';
import messages from './messages';

const Input = ({
  field,
  meta: { error, isError },
  startAdornment,
  endAdornment,
  readOnly,
  ...rest
}) => {
  const classes = useStyles();
  return (
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
};

export default compose(withMetaData)(Input);
