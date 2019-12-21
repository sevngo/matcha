import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const Modal = ({ title, text, children, actions, ...rest }) => {
  return (
    <Dialog {...rest}>
      <DialogTitle>{title && <FormattedMessage {...title} />}</DialogTitle>
      <DialogContent>
        {text && (
          <DialogContentText>
            <FormattedMessage {...text} />
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};

export default Modal;
