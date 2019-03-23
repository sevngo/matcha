import React, { useState } from 'react';
import { withFormik, Field } from 'formik';
import { has, compose, map, range } from 'ramda';
import {
  Grid,
  withStyles,
  Button,
  FormControlLabel,
  Radio as MRadio,
  MenuItem,
} from '@material-ui/core';
import Icon from '../Icon';
import TextField from '../TextField';
import Radio from '../Radio';
import Select from '../Select';
import Interests from '../Interests';
import {
  composeValidators,
  isRequired,
  isEmail,
  isShort,
  isLong,
  isDate,
} from '../../utils/validates';
import * as constants from '../../utils/constants';

const styles = theme => ({
  mt1: {
    marginTop: theme.spacing(1),
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
});

const Component = ({
  handleSubmit,
  initialValues,
  classes,
  isValid,
  readOnly,
  newPassword,
  resetForm,
  dirty,
}) => {
  const [showPassword, toggleShowPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit}>
      {has('username', initialValues) && (
        <Field
          name="username"
          label={constants.username}
          component={TextField}
          validate={composeValidators(isRequired, isShort, isLong(20))}
          fullWidth
          startAdornment="account_circle"
          readOnly={readOnly}
        />
      )}
      {has('password', initialValues) && (
        <Field
          name="password"
          label={newPassword ? constants.newPassword : constants.password}
          component={TextField}
          validate={composeValidators(isRequired, isShort, isLong(20))}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          startAdornment="vpn_key"
          endAdornment={
            <Icon color="inherit" onClick={() => toggleShowPassword(!showPassword)}>
              {showPassword ? 'visibility' : 'visibility_off'}
            </Icon>
          }
        />
      )}
      {has('newPassword', initialValues) && (
        <Field
          name="newPassword"
          label={constants.newPassword}
          component={TextField}
          validate={composeValidators(isShort, isLong(20))}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          startAdornment="vpn_key"
          endAdornment={
            <Icon color="inherit" onClick={() => toggleShowPassword(!showPassword)}>
              {showPassword ? 'visibility' : 'visibility_off'}
            </Icon>
          }
        />
      )}
      {has('email', initialValues) && (
        <Field
          name="email"
          label={constants.email}
          component={TextField}
          validate={composeValidators(isRequired, isEmail, isLong(20))}
          fullWidth
          startAdornment="alternate_email"
          readOnly={readOnly}
        />
      )}
      {has('firstName', initialValues) && (
        <Field
          name="firstName"
          label={constants.firstName}
          component={TextField}
          validate={composeValidators(isRequired, isLong(20))}
          fullWidth
          readOnly={readOnly}
        />
      )}
      {has('lastName', initialValues) && (
        <Field
          name="lastName"
          label={constants.lastName}
          component={TextField}
          validate={composeValidators(isRequired, isLong(20))}
          fullWidth
          readOnly={readOnly}
        />
      )}
      {has('birthDate', initialValues) && (
        <Field
          name="birthDate"
          label={constants.birthDate}
          component={TextField}
          validate={composeValidators(isRequired, isDate)}
          fullWidth
          type="date"
          startAdornment="date_range"
          readOnly={readOnly}
        />
      )}
      {has('gender', initialValues) && (
        <div className={classes.gender}>
          <Field name="gender" label={constants.gender} component={Radio} validate={isRequired}>
            {map(gender => (
              <FormControlLabel
                key={gender.label}
                value={gender.value}
                control={<MRadio color="primary" />}
                label={gender.label}
                disabled={readOnly}
              />
            ))(constants.genders)}
          </Field>
        </div>
      )}
      {has('ageMin', initialValues) &&
        has('ageMax', initialValues) &&
        map(({ name, label }) => (
          <Field
            key={name}
            name={name}
            label={label}
            labelWidth={65}
            component={Select}
            className={classes.width}
          >
            {map(age => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))(range(18, 50))}
          </Field>
        ))(constants.ageDifference)}
      {has('interests', initialValues) && (
        <Field
          name="interests"
          label="Interests"
          component={Select}
          multiple
          fullWidth
          validate={isLong(5)}
          readOnly={readOnly}
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
          label="Biography"
          component={TextField}
          validate={isLong(200)}
          fullWidth
          multiline
          rows="3"
          readOnly={readOnly}
        />
      )}
      <Grid container justify="center">
        {!readOnly && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!isValid}
            className={classes.mt1}
          >
            {constants.submit}
          </Button>
        )}
        {!readOnly && (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            className={classes.mt1}
            disabled={!dirty}
            onClick={() => resetForm(initialValues)}
          >
            {constants.reset}
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
  withStyles(styles),
)(Component);
