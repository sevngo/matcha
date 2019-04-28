import React from 'react';
import { withStyles, Popover as MPopover } from '@material-ui/core';
import styles from './styles';

const Popover = ({ classes, children, ...rest }) => (
  <MPopover {...rest}>
    <div className={classes.p2}>{children}</div>
  </MPopover>
);

export default withStyles(styles)(Popover);
