import { trim } from 'ramda';

export const isEmail = (value) =>
  !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ? 'invalid' : null;

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

export const isTrimmed = (value) => (value !== trim(value) ? 'invalid' : null);
