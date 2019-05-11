const { defaultTo, filter, isEmpty } = require('ramda');
const { NODE_ENV, DEVSERVER_PORT } = require('./constants');

const defaultToNull = defaultTo(null);

const getAppUrl = req => {
  const { protocol, hostname } = req;
  const fullUrl =
    NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${req.get('host')}`;
  return fullUrl;
};

const compact = filter(value => value && !isEmpty(value));

module.exports = {
  getAppUrl,
  defaultToNull,
  compact,
};
