import React, { useState, useCallback } from 'react';
import { withFormik, Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { has, compose, map, isNil, __, path } from 'ramda';
import { Button, MenuItem, Box } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ClearIcon from '@material-ui/icons/Clear';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';
import Input from '../Input';
import Radio from '../Radio';
import Select from '../Select';
import Slider from '../Slider';
import { useGeolocation, useAutocomplete } from '../../hooks';
import {
  composeValidators,
  isRequired,
  isEmail,
  minLength,
  maxLength,
  isYoung,
  isOld,
  isTrimmed,
} from '../../utils';
import { GENDER_OPTIONS, SORT_BY_OPTIONS } from './constants';
import messages from './messages';

const Component = ({
  handleSubmit,
  initialValues,
  isValid,
  disabled,
  resetForm,
  dirty,
  setFieldValue,
  values,
  isGeoActivated,
}) => {
  const classes = useStyles();
  const [showPassword, toggleShowPassword] = useState(false);
  const hasInitialValue = has(__, initialValues);
  const address = values['address'];
  const isValidAddress = !isNil(path(['address', 'coordinates'])(values));
  const handleAddress = useCallback(address => setFieldValue('address', address), [setFieldValue]);
  useGeolocation(handleAddress, address && isGeoActivated);
  useAutocomplete('address', handleAddress, !isNil(address));
  return (
    <form onSubmit={handleSubmit}>
      {hasInitialValue('username') && (
        <Field
          name="username"
          autoComplete="username"
          label={<FormattedMessage {...messages.username} />}
          component={Input}
          validate={composeValidators(isRequired, minLength, maxLength(30), isTrimmed)}
          startAdornment={<AccountCircleIcon />}
          disabled={disabled}
        />
      )}
      {hasInitialValue('password') && (
        <Field
          name="password"
          autoComplete="password"
          label={<FormattedMessage {...messages.password} />}
          component={Input}
          validate={composeValidators(isRequired, minLength, maxLength(30), isTrimmed)}
          type={showPassword ? 'text' : 'password'}
          startAdornment={<VpnKeyIcon />}
          endAdornment={{
            icon: showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />,
            action: () => toggleShowPassword(!showPassword),
          }}
        />
      )}
      {hasInitialValue('newPassword') && (
        <Field
          name="newPassword"
          autoComplete="password"
          label={<FormattedMessage {...messages.newPassword} />}
          component={Input}
          validate={composeValidators(minLength, maxLength(30), isTrimmed)}
          type={showPassword ? 'text' : 'password'}
          startAdornment={<VpnKeyIcon />}
          endAdornment={{
            icon: showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />,
            action: () => toggleShowPassword(!showPassword),
          }}
        />
      )}
      {hasInitialValue('email') && (
        <Field
          name="email"
          label={<FormattedMessage {...messages.email} />}
          component={Input}
          validate={composeValidators(isRequired, isEmail, maxLength(30), isTrimmed)}
          startAdornment={<AlternateEmailIcon />}
          disabled={disabled}
        />
      )}
      {hasInitialValue('birthDate') && (
        <Field
          name="birthDate"
          label={<FormattedMessage {...messages.birthDate} />}
          component={Input}
          validate={composeValidators(isRequired, isYoung, isOld)}
          type="date"
          startAdornment={<DateRangeIcon />}
          disabled={disabled}
        />
      )}
      {hasInitialValue('gender') && (
        <Box mt={1} mb={1}>
          <Field
            name="gender"
            label={<FormattedMessage {...messages.gender} />}
            component={Radio}
            validate={isRequired}
            options={GENDER_OPTIONS}
            messages={messages}
          />
        </Box>
      )}
      {hasInitialValue('address') && (
        <Field
          name="address.name"
          id="address"
          label={<FormattedMessage {...messages.address} />}
          component={Input}
          disabled={disabled || isValidAddress}
          validate={() => isRequired(isValidAddress)}
          endAdornment={
            isValidAddress &&
            !disabled && {
              icon: <ClearIcon />,
              action: () => setFieldValue('address', { name: '' }),
            }
          }
        />
      )}
      {hasInitialValue('ageRange') && (
        <Box p={1}>
          <Field
            name="ageRange"
            label={<FormattedMessage {...messages.ageRange} />}
            component={Slider}
            min={18}
            max={50}
            setFieldValue={setFieldValue}
          />
        </Box>
      )}
      {hasInitialValue('maxDistance') && (
        <Box p={1}>
          <Field
            name="maxDistance"
            label={<FormattedMessage {...messages.maxDistance} />}
            unitLabel={<FormattedMessage {...messages.unitDistance} />}
            component={Slider}
            min={50}
            max={20000}
            step={50}
            setFieldValue={setFieldValue}
          />
        </Box>
      )}
      {hasInitialValue('sortBy') && (
        <Field name="sortBy" label={<FormattedMessage {...messages.sortBy} />} component={Select}>
          {map(option => (
            <MenuItem key={option.id} value={option.value}>
              <FormattedMessage {...messages[option.id]} />
            </MenuItem>
          ))(SORT_BY_OPTIONS)}
        </Field>
      )}
      {!disabled && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!isValid}
          fullWidth
          className={classes.mt1}
        >
          <FormattedMessage {...messages.submit} />
        </Button>
      )}
      {!disabled && (
        <Button
          variant="outlined"
          color="primary"
          size="large"
          disabled={!dirty}
          onClick={() => resetForm({ values: initialValues })}
          fullWidth
        >
          <FormattedMessage {...messages.cancel} />
        </Button>
      )}
    </form>
  );
};

export default compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    handleSubmit: (values, { props: { submit } }) => submit(values),
    displayName: 'UserForm',
    enableReinitialize: true,
    mapPropsToErrors: () => ({ isInitialInvalid: true }),
  }),
)(Component);
