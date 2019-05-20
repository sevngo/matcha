const { compact } = require('../utils/functions');

exports.matchById = _id => ({ $match: { _id } });

const birthDate = {
  $addFields: {
    birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
  },
};

exports.project = fields => ({ $project: fields });

exports.usersPipeline = (...stages) => {
  const pipeline = compact([...stages, birthDate]);
  return pipeline;
};
