const { defaultTo, filter, isEmpty } = require('ramda');
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
