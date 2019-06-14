import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { getIsLoading } from '../../selectors';
import useStyles from './styles';

const Loading = () => {
  const classes = useStyles();
  const isLoading = useSelector(getIsLoading);
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

export default Loading;
