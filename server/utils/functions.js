const { defaultTo, filter, isEmpty, reduce } = require('ramda');
const { ObjectID } = require('mongodb');
const { NODE_ENV, DEVSERVER_PORT } = require('./constants');

exports.asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.defaultToNull = defaultTo(null);

exports.getAppUrl = (protocol, hostname, host) => {
  const fullUrl =
    NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${host}`;
  return fullUrl;
};

exports.compact = filter(value => value && !isEmpty(value));

exports.getIds = reduce((acc, object) => [...acc, object._id], []);

exports.createNotification = user => ({ user, createdAt: new Date(), _id: ObjectID() });

exports.matchById = _id => ({ $match: { _id } });

exports.project = fields => ({ $project: fields });
