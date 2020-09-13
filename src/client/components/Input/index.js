import React from 'react';
import { FormattedMessage } from 'react-intl';
import { TextField, IconButton, Box } from '@material-ui/core';
import useStyles from './styles';
import messages from './messages';

const Input = ({ startAdornment, endAdornment, error, ...rest }) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      error={Boolean(error)}
      helperText={error && <FormattedMessage {...messages[error]} />}
      fullWidth
      InputProps={{
        startAdornment: startAdornment && (
          <Box className={classes.icon}>{startAdornment}</Box>
        ),
        endAdornment: endAdornment && (
          <IconButton edge="end" onClick={endAdornment.action}>
            {endAdornment.icon}
          </IconButton>
        ),
      }}
      {...rest}
    />
  );
};

export default Input;
