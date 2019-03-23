import React, { Fragment } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import Progress from '../../components/Progress';
import { getIsLoading } from '../../selectors';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    top: '0',
    left: '0',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Component = ({ classes, isLoading }) => {
  if (!isLoading) return false;
  return (
    <Fragment>
      <div className={classes.root} />
      <div className={classes.loader}>
        <Progress size={100} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Component);
