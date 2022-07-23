import { trim } from 'ramda';

export const isEmail = (value) =>
  value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? null
    : 'invalid';

export const isTrimmed = (value) => (value !== trim(value) ? 'invalid' : null);
