import React from 'react';
import { Dialog, withStyles } from '@material-ui/core';
import styles from './styles';

const Modal = ({ classes, children, ...rest }) => (
  <Dialog {...rest}>
    <div className={classes.p3}>{children}</div>
  </Dialog>
);

export default withStyles(styles)(Modal);
