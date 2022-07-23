import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { formMessages } from '../../../utils/messages';

const Input = ({
  name,
  control,
  rules,
  startAdornment,
  endAdornment,
  otherError,
  readOnly,
  min,
  max,
  InputProps,
  ...rest
}) => {
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
      inputProps={{ min, max }}
      InputProps={{
        startAdornment: startAdornment && (
          <Box sx={{ ml: 0.5, mr: 1.5 }}>{startAdornment}</Box>
        ),
        endAdornment: endAdornment && (
          <IconButton
            edge="end"
            data-testid={`${fields.name}EndAdornment`}
            onClick={endAdornment.action}
            size="large"
          >
            {endAdornment.icon}
          </IconButton>
        ),
        readOnly,
        ...InputProps,
      }}
      {...fields}
      {...rest}
    />
  );
};

export default Input;
