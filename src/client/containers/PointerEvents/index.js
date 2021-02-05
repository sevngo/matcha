import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import useStyles from './styles';
import { getLoading } from '../../selectors/loading';

const PointerEvents = () => {
  const classes = useStyles();
  const isLoading = useSelector(getLoading);
  return (
    <Box
      className={`${classes.root} ${
        isLoading ? classes.pointerEventsNone : classes.pointerEventsAuto
      }`}
    ></Box>
  );
};

export default PointerEvents;
