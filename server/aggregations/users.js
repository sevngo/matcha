const { filter: rFilter } = require('ramda');

const matchById = _id => ({ $match: { _id } });

const birthDate = {
  $addFields: {
    birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
  },
};

const project = fields => ({ $project: fields });

const usersPipeline = (...stages) => {
  const pipeline = rFilter(stage => stage)([...stages, birthDate]);
  return pipeline;
};

module.exports = { usersPipeline, matchById, project };
