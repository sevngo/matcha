import { has, isNil, __ } from 'ramda';
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

const validate = (initialValues, values, newPasswordLabel) => {
  const hasInitialValue = has(__, initialValues);
  const errors = {};
  const usernameError =
    hasInitialValue('username') &&
    composeValidators(
      isRequired,
      minLength,
      maxLength(40),
      isTrimmed
    )(values.username);
  const passwordError =
    hasInitialValue('password') &&
    composeValidators(
      newPasswordLabel ? () => false : isRequired,
      minLength,
      maxLength(40),
      isTrimmed
    )(values.password);
  const emailError =
    hasInitialValue('email') &&
    composeValidators(
      isRequired,
      isEmail,
      maxLength(40),
      isTrimmed
    )(values.email);
  const birthDateError =
    hasInitialValue('birthDate') &&
    composeValidators(isRequired, isYoung, isOld)(values.birthDate);
  const genderError = hasInitialValue('gender') && isRequired(values.gender);
  const addressError =
    hasInitialValue('address') &&
    isRequired(!isNil(values.address?.coordinates));
  if (usernameError) errors.username = usernameError;
  if (passwordError) errors.password = passwordError;
  if (emailError) errors.email = emailError;
  if (birthDateError) errors.birthDate = birthDateError;
  if (genderError) errors.gender = genderError;
  if (addressError) errors.address = addressError;
  return errors;
};

export default validate;
