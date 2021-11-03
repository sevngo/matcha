import { trim } from 'ramda';

export const isEmail = (value) =>
  !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ? 'invalid' : null;

export const isTrimmed = (value) => (value !== trim(value) ? 'invalid' : null);
