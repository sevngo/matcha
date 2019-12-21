import React, { Fragment } from 'react';
import Loader from '../../components/Loader';
import { useApp } from '../../hooks';
import useStyles from './styles';

const Loading = () => {
  const classes = useStyles();
  const { isLoading } = useApp();
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
