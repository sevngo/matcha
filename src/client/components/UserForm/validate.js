import { has, isNil, __, path } from 'ramda';
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

const validate = (initialValues, values) => {
  const hasInitialValue = has(__, initialValues);
  const errors = {};
  const usernameError =
    hasInitialValue('username') &&
    composeValidators(
      isRequired,
      minLength,
      maxLength(30),
      isTrimmed
    )(values.username);
  const passwordError =
    hasInitialValue('password') &&
    composeValidators(
      isRequired,
      minLength,
      maxLength(30),
      isTrimmed
    )(values.password);
  const newPasswordError =
    hasInitialValue('newPassword') &&
    composeValidators(minLength, maxLength(30), isTrimmed)(values.newPassword);
  const emailError =
    hasInitialValue('email') &&
    composeValidators(
      isRequired,
      isEmail,
      maxLength(30),
      isTrimmed
    )(values.email);
  const birthDateError =
    hasInitialValue('birthDate') &&
    composeValidators(isRequired, isYoung, isOld)(values.birthDate);
  const genderError = hasInitialValue('gender') && isRequired(values.gender);
  const addressError =
    hasInitialValue('address') &&
    isRequired(!isNil(path(['address', 'coordinates'])(values)));
  if (usernameError) errors.username = usernameError;
  if (passwordError) errors.password = passwordError;
  if (newPasswordError) errors.newPassword = newPasswordError;
  if (emailError) errors.email = emailError;
  if (birthDateError) errors.birthDate = birthDateError;
  if (genderError) errors.gender = genderError;
  if (addressError) errors.address = addressError;
  return errors;
};

export default validate;
