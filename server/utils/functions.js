const { defaultTo } = require('ramda');
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

module.exports = {
  getAppUrl,
  defaultToNull,
};
