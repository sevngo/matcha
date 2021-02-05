import { is } from 'ramda';

export const match = (key, value) => {
  if (value)
    return {
      $match: { [key]: is(Array)(value) ? { $all: value } : value },
    };
};

export const matchIn = (key, value) => {
  if (value)
    return {
      $match: { [key]: { $in: value } },
    };
};
