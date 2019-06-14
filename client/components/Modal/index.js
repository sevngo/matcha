import React from 'react';
import { Dialog } from '@material-ui/core';
import useStyles from './styles';

const Modal = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Dialog {...rest}>
      <div className={classes.p3}>{children}</div>
    </Dialog>
  );
};

export default Modal;
