const { pick, split, is } = require('ramda');
const { ObjectID } = require('mongodb');
const { defaultToNull } = require('../utils');

const limit = (req, res, next) => {
  const {
    query: { limit },
  } = req;
  const intLimit = defaultToNull(parseInt(limit));
  req.limit = intLimit && { $limit: intLimit };
  next();
};

const skip = (req, res, next) => {
  const {
    query: { skip },
  } = req;
  const intSkip = defaultToNull(parseInt(skip));
  req.skip = intSkip && { $skip: intSkip };
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

const birthRange = (req, res, next) => {
  const {
    query: { birthRange },
  } = req;
  if (birthRange) {
    const [birthMin, birthMax] = split(':')(birthRange);
    req.birthRange = birthMin &&
      birthMax && { $match: { birthDate: { $gt: new Date(birthMin), $lt: new Date(birthMax) } } };
  }
  next();
};

const maxDistance = (req, res, next) => {
  const {
    query: { coordinates, maxDistance },
  } = req;
  if (coordinates) {
    const [lng, lat] = split(':')(coordinates);
    req.maxDistance = {
      $geoNear: {
        near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
        maxDistance: parseInt(maxDistance),
        spherical: true,
      },
    };
  }
  next();
};

const notMyUser = (req, res, next) => {
  req.notMyUser = { $match: { _id: { $not: { $eq: new ObjectID(req.user._id) } } } };
  next();
};

module.exports = {
  limit,
  skip,
  sort,
  gender,
  interests,
  birthRange,
  maxDistance,
  notMyUser,
};
