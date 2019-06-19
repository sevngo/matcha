const { defaultTo, filter, isEmpty, reduce } = require('ramda');
const { ObjectID } = require('mongodb');
const { NODE_ENV, DEVSERVER_PORT } = require('./constants');

exports.defaultToNull = defaultTo(null);

exports.getAppUrl = (protocol, hostname, host) => {
  const fullUrl =
    NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${host}`;
  return fullUrl;
};

const compact = filter(value => value && !isEmpty(value));
exports.compact = compact;

exports.getIds = reduce((acc, object) => [...acc, object._id], []);

exports.createNotification = user => ({ user, createdAt: new Date(), _id: ObjectID() });

exports.matchById = _id => ({ $match: { _id } });

exports.project = fields => ({ $project: fields });

exports.usersPipeline = (...stages) => {
  const birthDate = {
    $addFields: {
      birthDate: { $dateToString: { format: '%Y-%m-%d', date: '$birthDate' } },
    },
  };
  const pipeline = compact([...stages, birthDate]);
  return pipeline;
};
