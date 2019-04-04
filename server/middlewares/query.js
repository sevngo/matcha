const { pick, split, is } = require('ramda');
const { defaultToNull } = require('../utils');

const limit = (req, res, next) => {
  const {
    query: { limit },
  } = req;
  req.limit = defaultToNull(parseInt(limit)) && { $limit: limit };
  next();
};

const skip = (req, res, next) => {
  const {
    query: { skip },
  } = req;
  req.skip = defaultToNull(parseInt(skip)) && { $skip: skip };
  next();
};

const sort = (req, res, next) => {
  const {
    query: { sortBy },
  } = req;
  if (sortBy) {
    const [key, value] = split(':')(sortBy);
    req.sort = { $sort: { [key]: value === 'desc' ? -1 : 1 } };
  }
  next();
};

const interests = (req, res, next) => {
  const { query } = req;
  const { interests } = query;
  req.interests = {
    $match: is(Array)(interests) ? { interests: { $all: interests } } : pick(['interests'])(query),
  };
  next();
};

const gender = (req, res, next) => {
  const { query } = req;
  req.gender = query.gender && { $match: pick(['gender'])(query) };
  next();
};

module.exports = {
  limit,
  skip,
  sort,
  gender,
  interests,
};
