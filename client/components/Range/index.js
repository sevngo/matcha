import React, { Fragment } from 'react';
import { FormLabel, withStyles } from '@material-ui/core';
import { repeat } from 'ramda';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const styles = theme => ({
  values: {
    color: 'black',
  },
  m1: {
    marginTop: theme.spacing(1),
  },
});

const Component = ({ field: { name, value }, theme, classes, setFieldValue, ...rest }) => {
  const { main } = theme.palette.primary;
  return (
    <Fragment>
      <FormLabel className={classes.gender}>
        Age Range :{' '}
        <span className={classes.values}>
          {value[0]} - {value[1]}
        </span>
      </FormLabel>
      <div className={classes.m1}>
        <Range
          defaultValue={value}
          value={value}
          allowCross={false}
          pushable={true}
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
