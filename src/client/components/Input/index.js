import { Box, IconButton, TextField } from '@material-ui/core';
import React from 'react';
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { formMessages } from '../../utils/messages';
import useStyles from './styles';

const Input = ({
  name,
  control,
  rules,
  startAdornment,
  endAdornment,
  otherError,
  readOnly,
  ...rest
}) => {
  const classes = useStyles();
  const {
    field: { ref, ...fields },
    fieldState,
  } = useController({
    name,
    control,
    rules,
  });
  const error = otherError || fieldState.error?.type;
  return (
    <TextField
      variant="outlined"
      error={Boolean(error)}
      helperText={error && <FormattedMessage {...formMessages[error]} />}
      fullWidth
      inputRef={ref}
      InputProps={{
        startAdornment: startAdornment && (
          <Box className={classes.icon}>{startAdornment}</Box>
        ),
        endAdornment: endAdornment && (
          <IconButton edge="end" onClick={endAdornment.action}>
            {endAdornment.icon}
          </IconButton>
        ),
        readOnly,
      }}
      {...fields}
      {...rest}
    />
  );
};

export default Input;
