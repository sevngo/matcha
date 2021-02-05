import React from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import useStyles from './styles';
import { getLoading } from '../../selectors/loading';

const Loader = () => {
  const classes = useStyles();
  const isLoading = useSelector(getLoading);
  return (
    <LinearProgress
      className={
        isLoading ? classes.visibilityVisible : classes.visibilityHidden
      }
      thickness={8}
    />
  );
};

export default Loader;
