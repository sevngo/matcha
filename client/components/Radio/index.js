import React from 'react';
import { FormattedMessage } from 'react-intl';
import { map } from 'ramda';
import {
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio as MRadio,
} from '@material-ui/core';
import withMetaData from '../../hoc/withMetaData';

const Radio = ({ field, meta: { isError }, label, options, messages, disabled, ...rest }) => {
  const { name } = field;
  return (
    <FormControl error={isError}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row {...field} {...rest}>
        {map(option => (
          <FormControlLabel
            name={name}
            key={option.id}
            value={option.value}
            control={<MRadio color="primary" />}
            label={<FormattedMessage {...messages[option.id]} />}
            disabled={disabled}
          />
        ))(options)}
      </RadioGroup>
    </FormControl>
  );
};

export default withMetaData(Radio);
