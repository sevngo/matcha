const { compact } = require('../utils/functions');

exports.usersPipeline = (...stages) => {
  const birthDate = {
    $addFields: {
      birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
    },
  };
  const pipeline = compact([...stages, birthDate]);
  return pipeline;
};
