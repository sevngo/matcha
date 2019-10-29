import { Slider as MSlider, FormLabel } from '@material-ui/core';
import { is } from 'ramda';
import React, { Fragment } from 'react';
import useStyles from './styles';

const Slider = ({ field, label, unitLabel, setFieldValue, ...rest }) => {
  const classes = useStyles();
  const { value, name } = field;
  return (
    <Fragment>
      <FormLabel>
        {label}{' '}
        <span className={classes.values}>
          {is(Array)(value) ? `${value[0]} - ${value[1]}` : value}
        </span>{' '}
        {unitLabel}
      </FormLabel>
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
