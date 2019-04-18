import React, { useState } from 'react';
import { withFormik, Field } from 'formik';
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
import withGooglePlaces from '../../hoc/withGooglePlaces';
import {
  composeValidators,
  isRequired,
  isEmail,
  isShort,
  isLong,
  isYoung,
  isOld,
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
  readOnly,
  newPassword,
  resetForm,
  dirty,
  setFieldValue,
  values,
}) => {
  const [showPassword, toggleShowPassword] = useState(false);
  const isAddresNull = isNil(path(['address', 'lat'])(values));
  return (
    <form onSubmit={handleSubmit}>
      {has('username', initialValues) && (
        <Field
          name="username"
          label={constants.username}
          component={TextField}
          validate={composeValidators(isRequired, isShort, isLong(30))}
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
          validate={composeValidators(isRequired, isShort, isLong(30))}
          type={showPassword ? 'text' : 'password'}
          fullWidth
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
          label={constants.newPassword}
          component={TextField}
          validate={composeValidators(isShort, isLong(30))}
          type={showPassword ? 'text' : 'password'}
          fullWidth
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
          label={constants.email}
          component={TextField}
          validate={composeValidators(isRequired, isEmail, isLong(30))}
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
          validate={composeValidators(isRequired, isLong(30))}
          fullWidth
          readOnly={readOnly}
        />
      )}
      {has('lastName', initialValues) && (
        <Field
          name="lastName"
          label={constants.lastName}
          component={TextField}
          validate={composeValidators(isRequired, isLong(30))}
          fullWidth
          readOnly={readOnly}
        />
      )}
      {has('birthDate', initialValues) && (
        <Field
          name="birthDate"
          label={constants.birthDate}
          component={TextField}
          validate={composeValidators(isRequired, isYoung, isOld)}
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
      {has('address', initialValues) && (
        <Field
          name="address.name"
          id="address"
          label={constants.address}
          component={TextField}
          fullWidth
          readOnly={readOnly || !isAddresNull}
          validate={() => isAddresNull && 'Required'}
          endAdornment={
            !isAddresNull &&
            !readOnly && (
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
            component={Range}
            min={18}
            max={50}
            setFieldValue={setFieldValue}
          />
        </div>
      )}
      {has('interests', initialValues) && (
        <Field
          name="interests"
          label="Interests"
          component={Select}
          multiple
          fullWidth
          validate={isLong(4)}
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
          validate={isLong(300)}
          fullWidth
          multiline
          rows="3"
          readOnly={readOnly}
        />
      )}
      {has('sortBy', initialValues) && (
        <Field name="sortBy" label="Sort By" component={Select} fullWidth readOnly={readOnly}>
          {map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))(constants.sortByOptions)}
        </Field>
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
  withGooglePlaces('address'),
  withStyles(styles),
)(Component);
