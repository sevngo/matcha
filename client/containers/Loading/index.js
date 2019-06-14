import React, { Fragment } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Loader from '../../components/Loader';
import { getIsLoading } from '../../selectors';
import useStyles from './styles';

const Loading = ({ isLoading }) => {
  const classes = useStyles();
  if (!isLoading) return false;
  return (
    <Fragment>
      <div className={classes.root} />
      <div className={classes.loader}>
        <Loader size={100} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: getIsLoading,
});

export default compose(connect(mapStateToProps))(Loading);
