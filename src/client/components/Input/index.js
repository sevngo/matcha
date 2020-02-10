import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextField, IconButton, Box } from '@material-ui/core';
import { getFieldError } from '../../utils';
import useStyles from './styles';
import messages from './messages';

const Input = ({ field, form: { errors, touched }, startAdornment, endAdornment, ...rest }) => {
  const classes = useStyles();
  const { isError, error } = getFieldError(field.name, errors, touched);
  return (
    <TextField
      margin="dense"
      variant="outlined"
      error={isError}
      helperText={isError && <FormattedMessage {...messages[error]} />}
      fullWidth
      InputProps={{
        startAdornment: startAdornment && <Box className={classes.icon}>{startAdornment}</Box>,
        endAdornment: endAdornment && (
          <IconButton onClick={endAdornment.action}>{endAdornment.icon}</IconButton>
        ),
      }}
      {...field}
      {...rest}
    />
  );
};

export default Input;
