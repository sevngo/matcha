const { defaultTo } = require('ramda');
const url = require('url');

const defaultToNull = defaultTo(null);

const { JWT_SECRET, DEVSERVER_PORT } = process.env;

const getAppUrl = req => {
  const formatUrl = (protocol, host, port) => url.format({ protocol, host, port });
  const { protocol, hostname, get } = req;
  const fullUrl =
    process.env.NODE_ENV === 'development'
      ? formatUrl(protocol, hostname, DEVSERVER_PORT)
      : formatUrl(protocol, get('host'));
  return fullUrl;
};

module.exports = { defaultToNull, getAppUrl, JWT_SECRET };
