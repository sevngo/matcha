import React from 'react';
import { Icon, IconButton as MIconButton } from '@material-ui/core';

const IconButton = ({ children, ...rest }) => (
  <MIconButton color="inherit" {...rest}>
    <Icon>{children}</Icon>
  </MIconButton>
);

export default IconButton;
