import React from 'react';
import { Icon, IconButton as MIconButton } from '@material-ui/core';

const IconButton = ({ children, ...rest }) => (
  <MIconButton color="secondary" {...rest}>
    <Icon>{children}</Icon>
  </MIconButton>
);

export default IconButton;
