import React, { Fragment } from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const styles = theme => ({
  values: {
    color: 'black',
  },
  m1: {
    marginTop: theme.spacing(1),
  },
});

const Component = ({
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
        <Slider
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

export default withStyles(styles, { withTheme: true })(Component);
