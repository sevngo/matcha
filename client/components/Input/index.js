import React from 'react';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { TextField, Icon } from '@material-ui/core';
import IconButton from '../IconButton';
import withMetaData from '../../hoc/withMetaData';
import useStyles from './styles';
import messages from './messages';

const Input = ({ field, meta: { error, isError }, startAdornment, endAdornment, ...rest }) => {
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
        endAdornment: endAdornment && (
          <IconButton onClick={endAdornment.action}>{endAdornment.icon}</IconButton>
        ),
      }}
      {...field}
      {...rest}
    />
  );
};

export default compose(withMetaData)(Input);
