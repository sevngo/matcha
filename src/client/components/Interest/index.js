import React from 'react';
import { Chip } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './styles';

const Interest = ({ interest }) => {
  const classes = useStyles();
  return <Chip label={interest} className={clsx(classes.chip, classes[interest])} />;
};

export default Interest;
