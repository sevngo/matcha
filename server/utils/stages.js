const { split, is } = require('ramda');
const { defaultToNull } = require('./functions');

exports.matchById = _id => ({ $match: { _id } });

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

exports.matchRange = (key, min, max) => {
  if (is(Number)(min) && is(Number)(max)) {
    return { $match: { [key]: { $gt: min, $lt: max } } };
  }
};

exports.mismatch = (key, value) => {
  return { $match: { [key]: is(Array)(value) ? { $nin: value } : { $ne: value } } };
};

exports.project = fields => ({ $project: fields });

exports.getLimit = limit => {
  const intLimit = defaultToNull(parseInt(limit));
  if (intLimit) return { $limit: intLimit };
};

exports.getSkip = skip => {
  const intSkip = defaultToNull(parseInt(skip));
  if (intSkip) return { $skip: intSkip };
};

exports.getSort = sortBy => {
  if (sortBy) {
    const [key, value] = split(':')(sortBy);
    return { $sort: { [key]: value === 'desc' ? -1 : 1 } };
  }
};

exports.geoNear = (lng, lat, maxDistance) => {
  if (maxDistance && lng && lat) {
    return {
      $geoNear: {
        near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
        maxDistance: parseInt(maxDistance),
        spherical: true,
      },
    };
  }
};

exports.lookup = (from, localField, foreignField, as) => ({
  $lookup: { from, localField, foreignField, as },
});

exports.addFieldBirthDate = {
  $addFields: {
    birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
  },
};
