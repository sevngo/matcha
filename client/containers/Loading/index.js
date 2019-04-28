import React, { Fragment } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Progress from '../../components/Progress';
import { getIsLoading } from '../../selectors';
import { withStyles } from '@material-ui/core';
import styles from './styles';

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

const mapStateToProps = createStructuredSelector({
  isLoading: getIsLoading,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Component);
