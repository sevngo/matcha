import { reduce, length } from 'ramda';

export const composeValidators = (...validators) => value =>
  reduce((error, validator) => error || validator(value), undefined)(validators);

export const isRequired = value => !value && 'Required';

export const isEmail = value =>
  !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) && 'Invalid';

export const isShort = value => value && length(value) <= 3 && 'Too short';

export const isLong = max => value => length(value) >= max && 'Too long';

export const isOld = value => {
  const today = new Date();
  if (new Date(today.getFullYear() - 50, today.getMonth(), today.getDate()) > new Date(value))
    return 'Too old';
};

export const isYoung = value => {
  const today = new Date();
  if (new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()) < new Date(value))
    return 'Too young';
};
