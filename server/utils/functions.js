const { defaultTo, filter, isEmpty, reduce } = require('ramda');
const { ObjectID } = require('mongodb');
const { NODE_ENV, DEVSERVER_PORT } = require('./constants');

exports.defaultToNull = defaultTo(null);

exports.getAppUrl = req => {
  const { protocol, hostname } = req;
  const fullUrl =
    NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${req.get('host')}`;
  return fullUrl;
};

exports.compact = filter(value => value && !isEmpty(value));

exports.getIds = reduce((acc, object) => [...acc, object._id], []);

exports.createNotification = user => ({ user, createdAt: new Date(), _id: ObjectID() });
