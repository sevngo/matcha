import React from 'react';
import { withStyles, Popover } from '@material-ui/core';

const styles = theme => ({
  p2: {
    padding: theme.spacing(2),
  },
});

const Component = ({ classes, children, ...rest }) => (
  <Popover {...rest}>
    <div className={classes.p2}>{children}</div>
  </Popover>
);

export default withStyles(styles)(Component);
