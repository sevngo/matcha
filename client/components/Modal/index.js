import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const Modal = ({ title, text, content, actions, ...rest }) => {
  return (
    <Dialog {...rest}>
      <DialogTitle>{title && <FormattedMessage {...title} />}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text && <FormattedMessage {...text} />}</DialogContentText>
        {content}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
