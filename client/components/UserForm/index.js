import React, { useState } from 'react';
import { withFormik, Field } from 'formik';
import { FormattedMessage } from 'react-intl';
import { has, compose, map, isNil, path } from 'ramda';
import {
  Grid,
  withStyles,
  Button,
  FormControlLabel,
  Radio as MRadio,
  MenuItem,
} from '@material-ui/core';
import IconButton from '../IconButton';
import TextField from '../TextField';
import Radio from '../Radio';
import Select from '../Select';
import Interests from '../Interests';
import Range from '../Range';
import Slider from '../Slider';
import withGooglePlaces from '../../hoc/withGooglePlaces';
import {
  composeValidators,
  isRequired,
  isEmail,
  isShort,
  isLong,
  isYoung,
  isOld,
  isTrimmed,
} from '../../utils/validates';
import * as constants from '../../utils/constants';

const styles = theme => ({
  mt1: {
    marginTop: theme.spacing(1),
  },
  mb1: {
    marginBottom: theme.spacing(1),
  },
  gender: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1 / 4),
    color: 'white',
  },
  width: {
    width: '50%',
  },
  p1: {
    padding: theme.spacing(1),
  },
});

const Component = ({
  handleSubmit,
  initialValues,
  classes,
  isValid,
  disabled,
  resetForm,
  dirty,
  setFieldValue,
  values,
}) => {
  const [showPassword, toggleShowPassword] = useState(false);
  const isAddresNull = isNil(path(['address', 'coordinates'])(values));
  return (
    <form onSubmit={handleSubmit}>
      {has('username', initialValues) && (
        <Field
          name="username"
          label={<FormattedMessage id="components.userForm.username" />}
          component={TextField}
          validate={composeValidators(isRequired, isShort, isLong(30), isTrimmed)}
          startAdornment="account_circle"
          disabled={disabled}
        />
      )}
      {has('password', initialValues) && (
        <Field
          name="password"
          label={<FormattedMessage id="components.userForm.password" />}
          component={TextField}
          validate={composeValidators(isRequired, isShort, isLong(30), isTrimmed)}
          type={showPassword ? 'text' : 'password'}
          startAdornment="vpn_key"
          endAdornment={
            <IconButton color="inherit" onClick={() => toggleShowPassword(!showPassword)}>
              {showPassword ? 'visibility' : 'visibility_off'}
            </IconButton>
          }
        />
      )}
      {has('newPassword', initialValues) && (
        <Field
          name="newPassword"
          label={<FormattedMessage id="components.userForm.newPassword" />}
          component={TextField}
          validate={composeValidators(isShort, isLong(30), isTrimmed)}
          type={showPassword ? 'text' : 'password'}
          startAdornment="vpn_key"
          endAdornment={
            <IconButton color="inherit" onClick={() => toggleShowPassword(!showPassword)}>
              {showPassword ? 'visibility' : 'visibility_off'}
            </IconButton>
          }
        />
      )}
      {has('email', initialValues) && (
        <Field
          name="email"
          label={<FormattedMessage id="components.userForm.email" />}
          component={TextField}
          validate={composeValidators(isRequired, isEmail, isLong(30), isTrimmed)}
          startAdornment="alternate_email"
          disabled={disabled}
        />
      )}
      {has('firstName', initialValues) && (
        <Field
          name="firstName"
          label={<FormattedMessage id="components.userForm.firstName" />}
          component={TextField}
          validate={composeValidators(isRequired, isLong(30), isTrimmed)}
          disabled={disabled}
        />
      )}
      {has('lastName', initialValues) && (
        <Field
          name="lastName"
          label={<FormattedMessage id="components.userForm.lastName" />}
          component={TextField}
          validate={composeValidators(isRequired, isLong(30), isTrimmed)}
          disabled={disabled}
        />
      )}
      {has('birthDate', initialValues) && (
        <Field
          name="birthDate"
          label={<FormattedMessage id="components.userForm.birthDate" />}
          component={TextField}
          validate={composeValidators(isRequired, isYoung, isOld)}
          type="date"
          startAdornment="date_range"
          disabled={disabled}
        />
      )}
      {has('gender', initialValues) && (
        <div className={classes.gender}>
          <Field
            name="gender"
            label={<FormattedMessage id="components.userForm.gender" />}
            component={Radio}
            validate={isRequired}
          >
            {map(gender => (
              <FormControlLabel
                key={gender.label}
                value={gender.value}
                control={<MRadio color="primary" />}
                label={gender.label}
                disabled={disabled}
              />
            ))(constants.genders)}
          </Field>
        </div>
      )}
      {has('address', initialValues) && (
        <Field
          name="address.name"
          id="address"
          label={<FormattedMessage id="components.userForm.address" />}
          component={TextField}
          disabled={disabled || !isAddresNull}
          validate={() => isAddresNull && 'Required'}
          endAdornment={
            !isAddresNull &&
            !disabled && (
              <IconButton color="inherit" onClick={() => setFieldValue('address', { name: '' })}>
                clear
              </IconButton>
            )
          }
        />
      )}
      {has('ageRange', initialValues) && (
        <div className={classes.p1}>
          <Field
            name="ageRange"
            label={<FormattedMessage id="components.userForm.ageRange" />}
            component={Range}
            min={18}
            max={50}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
      {has('maxDistance', initialValues) && (
        <div className={classes.p1}>
          <Field
            name="maxDistance"
            label={<FormattedMessage id="components.userForm.maxDistance" />}
            unitLabel={<FormattedMessage id="components.userForm.unitDistance" />}
            component={Slider}
            min={50}
            max={20000}
            step={50}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
      {has('interests', initialValues) && (
        <Field
          name="interests"
          label={<FormattedMessage id="components.userForm.interests" />}
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
          ))(constants.interestsOptions)}
        </Field>
      )}
      {has('biography', initialValues) && (
        <Field
          name="biography"
          label={<FormattedMessage id="components.userForm.biography" />}
          component={TextField}
          validate={composeValidators(isLong(300), isTrimmed)}
          multiline
          rows="3"
          disabled={disabled}
        />
      )}
      {has('sortBy', initialValues) && (
        <Field
          name="sortBy"
          label={<FormattedMessage id="components.userForm.sortBy" />}
          component={Select}
        >
          {map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))(constants.sortByOptions)}
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
            <FormattedMessage id="components.userForm.submit" />
          </Button>
        )}
        {!disabled && (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            disabled={!dirty}
            onClick={() => resetForm(initialValues)}
            fullWidth
          >
            <FormattedMessage id="components.userForm.reset" />
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
  withGooglePlaces('address'),
  withStyles(styles),
)(Component);
