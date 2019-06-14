import React from 'react';
import { Popover as MPopover } from '@material-ui/core';
import useStyles from './styles';

const Popover = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <MPopover {...rest}>
      <div className={classes.p2}>{children}</div>
    </MPopover>
  );
};

export default Popover;
