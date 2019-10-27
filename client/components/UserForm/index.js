import React, { useState } from 'react';
import { withFormik, Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { has, compose, map, isNil, __, path } from 'ramda';
import { Grid, Button, MenuItem } from '@material-ui/core';
import Input from '../Input';
import Radio from '../Radio';
import Select from '../Select';
import Interests from '../Interests';
import Range from '../Range';
import Slider from '../Slider';
import { useGeolocation, useAutocomplete } from '../../hooks/googleMaps';
import {
  composeValidators,
  isRequired,
  isEmail,
  isShort,
  isLong,
  isYoung,
  isOld,
  isTrimmed,
} from '../../utils';
import { GENDER_OPTIONS, SORT_BY_OPTIONS, INTERESTS_OPTIONS } from './constants';
import useStyles from './styles';
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
  const handleAddress = address => setFieldValue('address', address);
  useGeolocation(handleAddress, address && isGeoActivated);
  useAutocomplete('address', handleAddress, address);
  return (
    <form onSubmit={handleSubmit}>
      {hasInitialValue('username') && (
        <Field
          name="username"
          label={<FormattedMessage {...messages.username} />}
          component={Input}
          validate={composeValidators(isRequired, isShort, isLong(30), isTrimmed)}
          startAdornment="account_circle"
          disabled={disabled}
        />
      )}
      {hasInitialValue('password') && (
        <Field
          name="password"
          label={<FormattedMessage {...messages.password} />}
          component={Input}
          validate={composeValidators(isRequired, isShort, isLong(30), isTrimmed)}
          type={showPassword ? 'text' : 'password'}
          startAdornment="vpn_key"
          endAdornment={{
            icon: showPassword ? 'visibility' : 'visibility_off',
            action: () => toggleShowPassword(!showPassword),
          }}
        />
      )}
      {hasInitialValue('newPassword') && (
        <Field
          name="newPassword"
          label={<FormattedMessage {...messages.newPassword} />}
          component={Input}
          validate={composeValidators(isShort, isLong(30), isTrimmed)}
          type={showPassword ? 'text' : 'password'}
          startAdornment="vpn_key"
          endAdornment={{
            icon: showPassword ? 'visibility' : 'visibility_off',
            action: () => toggleShowPassword(!showPassword),
          }}
        />
      )}
      {hasInitialValue('email') && (
        <Field
          name="email"
          label={<FormattedMessage {...messages.email} />}
          component={Input}
          validate={composeValidators(isRequired, isEmail, isLong(30), isTrimmed)}
          startAdornment="alternate_email"
          disabled={disabled}
        />
      )}
      {hasInitialValue('firstName') && (
        <Field
          name="firstName"
          label={<FormattedMessage {...messages.firstName} />}
          component={Input}
          validate={composeValidators(isRequired, isLong(30), isTrimmed)}
          disabled={disabled}
        />
      )}
      {hasInitialValue('lastName') && (
        <Field
          name="lastName"
          label={<FormattedMessage {...messages.lastName} />}
          component={Input}
          validate={composeValidators(isRequired, isLong(30), isTrimmed)}
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
          startAdornment="date_range"
          disabled={disabled}
        />
      )}
      {hasInitialValue('gender') && (
        <div className={classes.gender}>
          <Field
            name="gender"
            label={<FormattedMessage {...messages.gender} />}
            component={Radio}
            validate={isRequired}
            options={GENDER_OPTIONS}
            messages={messages}
          />
        </div>
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
              icon: 'clear',
              action: () => setFieldValue('address', { name: '' }),
            }
          }
        />
      )}
      {hasInitialValue('ageRange') && (
        <div className={classes.p1}>
          <Field
            name="ageRange"
            label={<FormattedMessage {...messages.ageRange} />}
            component={Range}
            min={18}
            max={50}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
      {hasInitialValue('maxDistance') && (
        <div className={classes.p1}>
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
        </div>
      )}
      {hasInitialValue('interests') && (
        <Field
          name="interests"
          label={<FormattedMessage {...messages.interests} />}
          component={Select}
          multiple
          validate={isLong(4)}
          disabled={disabled}
          renderValue={selected => <Interests interests={selected} />}
        >
          {map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))(INTERESTS_OPTIONS)}
        </Field>
      )}
      {hasInitialValue('biography') && (
        <Field
          name="biography"
          label={<FormattedMessage {...messages.biography} />}
          component={Input}
          validate={composeValidators(isLong(300), isTrimmed)}
          multiline
          rows="3"
          disabled={disabled}
        />
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
      <Grid container justify="center">
        {!disabled && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!isValid}
            className={classes.mt1}
            fullWidth
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
      </Grid>
    </form>
  );
};

export default compose(
  withFormik({
    mapPropsToValues: ({ initialValues }) => initialValues,
    handleSubmit: (values, { props: { submit } }) => submit(values),
    displayName: 'UserForm',
    enableReinitialize: true,
  }),
)(Component);
