const { split, is } = require('ramda');
const { ObjectID } = require('mongodb');
const { defaultToNull } = require('../utils/functions');

exports.limit = (req, res, next) => {
  const {
    query: { limit },
  } = req;
  const intLimit = defaultToNull(parseInt(limit));
  if (intLimit) req.limit = { $limit: intLimit };
  next();
};

exports.skip = (req, res, next) => {
  const {
    query: { skip },
  } = req;
  const intSkip = defaultToNull(parseInt(skip));
  if (intSkip) req.skip = { $skip: intSkip };
  next();
};

exports.sort = (req, res, next) => {
  const {
    query: { sortBy },
  } = req;
  if (sortBy) {
    const [key, value] = split(':')(sortBy);
    req.sort = { $sort: { [key]: value === 'desc' ? -1 : 1 } };
  }
  next();
};

exports.matchInterests = (req, res, next) => {
  const {
    query: { interests },
  } = req;
  if (interests) {
    req.matchInterests = {
      $match: is(Array)(interests) ? { interests: { $all: interests } } : { interests },
    };
  }
  next();
};

exports.matchGender = (req, res, next) => {
  const {
    query: { gender },
  } = req;
  if (gender) req.matchGender = gender && { $match: { gender } };
  next();
};

exports.matchBirthRange = (req, res, next) => {
  const {
    query: { birthRange },
  } = req;
  if (birthRange) {
    const [birthMin, birthMax] = split(':')(birthRange);
    req.matchBirthRange = birthMin &&
      birthMax && { $match: { birthDate: { $gt: new Date(birthMin), $lt: new Date(birthMax) } } };
  }
  next();
};

exports.maxDistance = (req, res, next) => {
  const {
    query: { maxDistance },
    myUser: {
      address: {
        coordinates: [lng, lat],
      },
    },
  } = req;
  if (maxDistance) {
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

exports.mismatchMyUser = (req, res, next) => {
  req.mismatchMyUser = { $match: { _id: { $ne: ObjectID(req.myUser._id) } } };
  next();
};

exports.lookupUsersLiked = (req, res, next) => {
  req.lookupUsersLiked = {
    $lookup: {
      from: 'users',
      localField: 'usersLiked',
      foreignField: '_id',
      as: 'usersLiked',
    },
  };
  next();
};

exports.lookupUsersBlocked = (req, res, next) => {
  req.lookupUsersBlocked = {
    $lookup: {
      from: 'users',
      localField: 'usersBlocked',
      foreignField: '_id',
      as: 'usersBlocked',
    },
  };
  next();
};

exports.mismatchUsersBlocked = (req, res, next) => {
  req.mismatchUsersBlocked = { $match: { _id: { $nin: req.myUser.usersBlocked } } };
  next();
};
