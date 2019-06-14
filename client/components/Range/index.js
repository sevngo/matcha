import React, { Fragment } from 'react';
import { FormLabel, withTheme } from '@material-ui/core';
import { repeat } from 'ramda';
import { Range as RcRange } from 'rc-slider';
import 'rc-slider/assets/index.css';
import useStyles from './styles';

const Range = ({ field: { name, value }, label, unitLabel, theme, setFieldValue, ...rest }) => {
  const classes = useStyles();
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
        <RcRange
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

export default withTheme(Range);
