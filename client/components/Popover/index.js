import React from 'react';
import { withStyles, Popover } from '@material-ui/core';
import styles from './styles';

const Component = ({ classes, children, ...rest }) => (
  <Popover {...rest}>
    <div className={classes.p2}>{children}</div>
  </Popover>
);

export default withStyles(styles)(Component);
