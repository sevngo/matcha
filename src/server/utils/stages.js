const { split, is, isEmpty } = require('ramda');
const { compact } = require('./functions');

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
  if (min && max) {
    return { $match: { [key]: { $gt: min, $lt: max } } };
  }
};

exports.mismatch = (key, value) => {
  return { $match: { [key]: is(Array)(value) ? { $nin: value } : { $ne: value } } };
};

exports.project = fields => ({ $project: fields });

exports.sort = sortBy => {
  if (sortBy) {
    const [key, value] = split(':')(sortBy);
    return { $sort: { [key]: value === 'desc' ? -1 : 1 } };
  }
};

exports.geoNear = (coordinates, maxDistance) => {
  if (maxDistance && !isEmpty(coordinates)) {
    return {
      $geoNear: {
        near: { type: 'Point', coordinates },
        distanceField: 'distance',
        distanceMultiplier: 0.001,
        maxDistance,
        spherical: true,
      },
    };
  }
};

exports.lookup = (from, localField, foreignField, as) => ({
  $lookup: { from, localField, foreignField, as },
});

exports.lookupPipeline = (from, pipeline, as) => ({
  $lookup: {
    from,
    pipeline,
    as,
  },
});

exports.pagination = (limit, skip) => {
  const getLimit = limit => {
    if (limit) return { $limit: limit };
  };
  const getSkip = skip => {
    if (skip) return { $skip: skip };
  };
  const paginate = compact([getSkip(skip), getLimit(limit)]);
  return [
    {
      $facet: {
        total: [{ $count: 'total' }],
        data: !isEmpty(paginate) ? paginate : [{ $match: {} }],
      },
    },
    { $addFields: { total: { $arrayElemAt: ['$total.total', 0] } } },
  ];
};

exports.addFieldBirthDate = {
  $addFields: {
    birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
  },
};
