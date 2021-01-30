import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { has, map, isNil, __, path } from 'ramda';
import { useFormik } from 'formik';
import { Button, MenuItem, Grid } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ClearIcon from '@material-ui/icons/Clear';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MyLocationIcon from '@material-ui/icons/MyLocation';

import Input from '../Input';
import Radio from '../Radio';
import Select from '../Select';
import Slider from '../Slider';
import { useGeolocation, useAutocomplete } from '../../hooks/googleMaps';
import { GENDER_OPTIONS, SORT_BY_OPTIONS } from './constants';
import messages from './messages';
import validate from './validate';

const UserForm = ({
  initialValues,
  disabled,
  submit,
  newPasswordLabel,
  id,
}) => {
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
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit: submit,
    validate: (values) => validate(initialValues, values, newPasswordLabel),
    enableReinitialize: true,
  });
  const [showPassword, toggleShowPassword] = useState(false);
  const address = values['address'];
  const isValidAddress = !isNil(path(['address', 'coordinates'])(values));
  const handleAddress = useCallback(
    (address) => setFieldValue('address', address),
    [setFieldValue]
  );
  const getGeolocation = useGeolocation(handleAddress);
  useAutocomplete('address', handleAddress, !isNil(address));
  const passwordMessage = newPasswordLabel
    ? messages.newPassword
    : messages.password;
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Grid container direction="column" spacing={2}>
        {hasInitialValue('username') && (
          <Grid item>
            <Input
              inputProps={{ 'data-testid': 'usernameInput' }}
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
          </Grid>
        )}
        {hasInitialValue('password') && (
          <Grid item>
            <Input
              inputProps={{ 'data-testid': 'passwordInput' }}
              name="password"
              autoComplete="password"
              label={<FormattedMessage {...passwordMessage} />}
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
          </Grid>
        )}
        {hasInitialValue('email') && (
          <Grid item>
            <Input
              inputProps={{ 'data-testid': 'emailInput' }}
              name="email"
              label={<FormattedMessage {...messages.email} />}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && errors.email}
              startAdornment={<AlternateEmailIcon />}
              disabled={disabled}
            />
          </Grid>
        )}
        {hasInitialValue('birthDate') && (
          <Grid item>
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
          </Grid>
        )}
        {hasInitialValue('gender') && (
          <Grid item>
            <Radio
              name="gender"
              label={<FormattedMessage {...messages.gender} />}
              onChange={handleChange}
              value={values.gender}
              error={touched.gender && errors.gender}
              options={GENDER_OPTIONS}
              messages={messages}
              disabled={disabled}
            />
          </Grid>
        )}
        {hasInitialValue('address') && (
          <Grid item>
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
                (isValidAddress &&
                  !disabled && {
                    icon: <ClearIcon />,
                    action: () => setFieldValue('address', { name: '' }),
                  }) ||
                (!disabled && {
                  icon: <MyLocationIcon />,
                  action: getGeolocation,
                })
              }
            />
          </Grid>
        )}
        {hasInitialValue('ageRange') && (
          <Grid item>
            <Slider
              name="ageRange"
              label={<FormattedMessage {...messages.ageRange} />}
              value={values.ageRange}
              min={18}
              max={50}
              setFieldValue={setFieldValue}
            />
          </Grid>
        )}
        {hasInitialValue('maxDistance') && (
          <Grid item>
            <Slider
              name="maxDistance"
              label={<FormattedMessage {...messages.maxDistance} />}
              unitLabel={<FormattedMessage {...messages.unitDistance} />}
              value={values.maxDistance}
              min={50}
              max={20000}
              step={50}
              setFieldValue={setFieldValue}
            />
          </Grid>
        )}
        {hasInitialValue('sortBy') && (
          <Grid item>
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
          </Grid>
        )}
        {!disabled && (
          <Grid item>
            <Button
              data-testid={`submitForm-${id}`}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isValid || !dirty}
              fullWidth
            >
              <FormattedMessage {...messages.submit} />
            </Button>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default React.memo(UserForm);
