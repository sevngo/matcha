import React from 'react';
import { Icon, IconButton } from '@material-ui/core';

export default ({ children, ...rest }) => (
  <IconButton color="secondary" {...rest}>
    <Icon>{children}</Icon>
  </IconButton>
);
