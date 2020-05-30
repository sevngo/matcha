import { reduce, length, trim } from 'ramda';

export const composeValidators = (...validators) => (value) =>
  reduce(
    (error, validator) => error || validator(value),
    undefined
  )(validators);

export const isRequired = (value) => !value && 'required';

export const isEmail = (value) =>
  !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) && 'invalid';

export const minLength = (value) => value && length(value) < 3 && 'tooShort';

export const maxLength = (max) => (value) => length(value) > max && 'tooLong';

export const isOld = (value) => {
  const today = new Date();
  if (
    new Date(today.getFullYear() - 50, today.getMonth(), today.getDate()) >
    new Date(value)
  )
    return 'tooOld';
};

export const isYoung = (value) => {
  const today = new Date();
  if (
    new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()) <
    new Date(value)
  )
    return 'tooYoung';
};

export const isTrimmed = (value) => value !== trim(value) && 'invalid';
