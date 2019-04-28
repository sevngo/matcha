import React, { Fragment } from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles';

const Slider = ({
  field: { name, value },
  label,
  unitLabel,
  theme,
  classes,
  setFieldValue,
  ...rest
}) => {
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

export default withStyles(styles, { withTheme: true })(Slider);
