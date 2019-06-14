import React, { Fragment } from 'react';
import { FormLabel, withTheme } from '@material-ui/core';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useStyles from './styles';

const Slider = ({ field: { name, value }, label, unitLabel, theme, setFieldValue, ...rest }) => {
  const classes = useStyles();
  const { main } = theme.palette.primary;
  return (
    <Fragment>
      <FormLabel className={classes.gender}>
        {label} <span className={classes.values}>{value}</span> {unitLabel}
      </FormLabel>
      <div className={classes.m1}>
        <RcSlider
          defaultValue={value}
          value={value}
          trackStyle={{ backgroundColor: 'darkgray' }}
          handleStyle={{ backgroundColor: main, borderColor: main }}
          onChange={value => setFieldValue(name, value)}
          {...rest}
        />
      </div>
    </Fragment>
  );
};

export default withTheme(Slider);
