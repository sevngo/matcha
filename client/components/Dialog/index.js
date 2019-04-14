import React from 'react';
import { Dialog, withStyles } from '@material-ui/core';

const styles = theme => ({
  p3: {
    padding: theme.spacing(3),
  },
});

const Component = ({ classes, children, ...rest }) => (
  <Dialog {...rest}>
    <div className={classes.p3}>{children}</div>
  </Dialog>
);

export default withStyles(styles)(Component);
