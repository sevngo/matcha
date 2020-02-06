import { Slider as MSlider, FormLabel, Box } from '@material-ui/core';
import { is } from 'ramda';
import useStyles from './styles';
import React, { Fragment } from 'react';

const Slider = ({ field, label, unitLabel, setFieldValue, ...rest }) => {
  const classes = useStyles();
  const { value, name } = field;
  return (
    <Fragment>
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
        defaultValue={value}
        value={value}
        onChange={(e, value) => setFieldValue(name, value)}
        {...rest}
      />
    </Fragment>
  );
};

export default Slider;
