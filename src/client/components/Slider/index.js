import { Slider as MSlider, FormLabel, Box } from '@material-ui/core';
import { is } from 'ramda';
import useStyles from './styles';
import React from 'react';

const Slider = ({
  name,
  value,
  field,
  label,
  unitLabel,
  setFieldValue,
  className,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <FormLabel>
        {label}{' '}
        <Box color="black" display="inline">
          {is(Array)(value) ? `${value[0]} - ${value[1]}` : value}
        </Box>{' '}
        {unitLabel}
      </FormLabel>
      <Box mt={1} />
      <MSlider
        className={classes.m1}
        value={value}
        onChange={(e, value) => setFieldValue(name, value)}
        {...rest}
      />
    </Box>
  );
};

export default Slider;
