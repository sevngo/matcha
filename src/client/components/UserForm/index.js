import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { has, map, isNil, __, path } from 'ramda';
import { useFormik } from 'formik';
import { Button, MenuItem } from '@material-ui/core';
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
import { GENDER_OPTIONS, SORT_BY_OPTIONS } from './constants';
import messages from './messages';
import validate from './validate';

const Component = ({ initialValues, disabled, isGeoActivated, submit }) => {
  const classes = useStyles();
  const hasInitialValue = has(__, initialValues);
  const {
    handleSubmit,
    handleChange,
    isValid,
    dirty,
    errors,
    touched,
    setFieldValue,
    values,
    resetForm,
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit: submit,
    validate: (values) => validate(initialValues, values),
    enableReinitialize: true,
  });
  const [showPassword, toggleShowPassword] = useState(false);
  const address = values['address'];
  const isValidAddress = !isNil(path(['address', 'coordinates'])(values));
  const handleAddress = useCallback((address) => setFieldValue('address', address), [
    setFieldValue,
  ]);
  useGeolocation(handleAddress, address && isGeoActivated);
  useAutocomplete('address', handleAddress, !isNil(address));
  return (
    <form onSubmit={handleSubmit}>
      {hasInitialValue('username') && (
        <Input
          name="username"
          autoComplete="username"
          onChange={handleChange}
          onBlur={handleBlur}
          label={<FormattedMessage {...messages.username} />}
          error={touched.username && errors.username}
          value={values.username}
          startAdornment={<AccountCircleIcon />}
          disabled={disabled}
        />
      )}
      {hasInitialValue('password') && (
        <Input
          name="password"
          autoComplete="password"
          label={<FormattedMessage {...messages.password} />}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && errors.password}
          type={showPassword ? 'text' : 'password'}
          startAdornment={<VpnKeyIcon />}
          endAdornment={{
            icon: showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />,
            action: () => toggleShowPassword(!showPassword),
          }}
        />
      )}
      {hasInitialValue('newPassword') && (
        <Input
          name="newPassword"
          autoComplete="password"
          label={<FormattedMessage {...messages.newPassword} />}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          error={touched.newPassword && errors.newPassword}
          type={showPassword ? 'text' : 'password'}
          startAdornment={<VpnKeyIcon />}
          endAdornment={{
            icon: showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />,
            action: () => toggleShowPassword(!showPassword),
          }}
        />
      )}
      {hasInitialValue('email') && (
        <Input
          name="email"
          label={<FormattedMessage {...messages.email} />}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && errors.email}
          startAdornment={<AlternateEmailIcon />}
          disabled={disabled}
        />
      )}
      {hasInitialValue('birthDate') && (
        <Input
          name="birthDate"
          label={<FormattedMessage {...messages.birthDate} />}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.birthDate}
          error={touched.birthDate && errors.birthDate}
          type="date"
          startAdornment={<DateRangeIcon />}
          disabled={disabled}
        />
      )}
      {hasInitialValue('gender') && (
        <Radio
          name="gender"
          label={<FormattedMessage {...messages.gender} />}
          onChange={handleChange}
          value={values.gender}
          error={touched.gender && errors.gender}
          options={GENDER_OPTIONS}
          messages={messages}
          disabled={disabled}
          className={classes.p1}
        />
      )}
      {hasInitialValue('address') && (
        <Input
          name="address.name"
          id="address"
          label={<FormattedMessage {...messages.address} />}
          disabled={disabled || isValidAddress}
          onChange={handleChange}
          onBlur={handleBlur}
          value={path(['address', 'name'])(values)}
          error={touched.address && errors.address}
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
        <Slider
          name="ageRange"
          label={<FormattedMessage {...messages.ageRange} />}
          value={values.ageRange}
          min={18}
          max={50}
          setFieldValue={setFieldValue}
          className={classes.p1}
        />
      )}
      {hasInitialValue('maxDistance') && (
        <Slider
          name="maxDistance"
          label={<FormattedMessage {...messages.maxDistance} />}
          unitLabel={<FormattedMessage {...messages.unitDistance} />}
          value={values.maxDistance}
          min={50}
          max={20000}
          step={50}
          setFieldValue={setFieldValue}
          className={classes.p1}
        />
      )}

      {hasInitialValue('sortBy') && (
        <Select
          name="sortBy"
          onChange={handleChange}
          error={touched.sortBy && errors.sortBy}
          value={values.sortBy}
          label={<FormattedMessage {...messages.sortBy} />}
        >
          {map((option) => (
            <MenuItem key={option.id} value={option.value}>
              <FormattedMessage {...messages[option.id]} />
            </MenuItem>
          ))(SORT_BY_OPTIONS)}
        </Select>
      )}
      {!disabled && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={!isValid || !dirty}
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

export default Component;
