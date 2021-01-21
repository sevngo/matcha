const { is } = require('ramda');

exports.match = (key, value) => {
  if (value)
    return {
      $match: { [key]: is(Array)(value) ? { $all: value } : value },
    };
};

exports.matchIn = (key, value) => {
  if (value)
    return {
      $match: { [key]: { $in: value } },
    };
};
