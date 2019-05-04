const { defaultTo } = require('ramda');

const defaultToNull = defaultTo(null);

const { JWT_SECRET, DEVSERVER_PORT, NODE_ENV } = process.env;

const getAppUrl = req => {
  const { protocol, hostname } = req;
  const fullUrl =
    NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${req.get('host')}`;
  return fullUrl;
};
module.exports = { defaultToNull, getAppUrl, JWT_SECRET };
