import React from 'react';
import { useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import useStyles from './styles';
import { getLoading } from '../../selectors/loading';

const Loader = () => {
  const classes = useStyles();
  const isLoading = useSelector(getLoading);
  return (
    <Backdrop className={classes.backdrop} open={isLoading} >
      <CircularProgress color="inherit" />
    </Backdrop >
  );
};

export default Loader;
