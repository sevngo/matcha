import React from 'react';
import { Paper } from '@material-ui/core';

const MyPaper = ({ children, ...rest }) => (
  <Paper elevation={1} {...rest}>
    {children}
  </Paper>
);

export default MyPaper;
