const { defaultTo } = require('ramda');
const url = require('url');

const defaultToNull = defaultTo(null);

const { JWT_SECRET } = process.env;

const getAppUrl = req => url.format({ protocol: req.protocol, host: req.get('host') });

module.exports = { defaultToNull, getAppUrl, JWT_SECRET };
