const { defaultTo } = require('ramda');

const defaultToNull = defaultTo(null);

const { JWT_SECRET, DEVSERVER_PORT } = process.env;

const getAppUrl = req => {
  const { protocol, hostname, get } = req;
  const fullUrl =
    process.env.NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${get('host')}`;
  return fullUrl;
};

module.exports = { defaultToNull, getAppUrl, JWT_SECRET };
