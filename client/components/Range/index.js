import React, { Fragment } from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import { repeat } from 'ramda';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles';

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
        {label}{' '}
        <span className={classes.values}>
          {value[0]} - {value[1]}
        </span>{' '}
        {unitLabel}
      </FormLabel>
      <div className={classes.m1}>
        <Range
          defaultValue={value}
          value={value}
          allowCross={false}
          pushable
          trackStyle={[{ backgroundColor: 'darkgray' }]}
          handleStyle={repeat({ backgroundColor: main, borderColor: main })(2)}
          onChange={value => setFieldValue(name, value)}
          {...rest}
        />
      </div>
    </Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(Component);
