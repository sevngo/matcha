const { filter: rFilter } = require('ramda');

const myUserProjection = { password: 0, 'images.data': 0 };
const projection = { ...myUserProjection, email: 0 };

const birthDate = {
  $addFields: {
    birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
  },
};

const matchById = _id => ({ $match: { _id } });

const usersPipeline = (gender, interests, limit, skip, sort) => {
  const pipeline = rFilter(stage => stage)([
    gender,
    interests,
    { $project: projection },
    limit,
    skip,
    sort,
    birthDate,
  ]);
  return pipeline;
};

const userPipeline = _id => [matchById(_id), { $project: projection }, birthDate];

const myUserPipeline = _id => [matchById(_id), { $project: myUserProjection }, birthDate];

module.exports = { usersPipeline, userPipeline, myUserPipeline };
