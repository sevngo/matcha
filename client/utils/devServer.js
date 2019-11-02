const Bundler = require('parcel-bundler');
const app = require('express')();
const proxy = require('http-proxy-middleware');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`),
});

const DEVSERVER_PORT = process.env.DEVSERVER_PORT;
const bundler = new Bundler(path.join(__dirname, '..', 'index.html'));

app.use('/api', proxy({ target: `http://localhost:${process.env.PORT}`, changeOrigin: true }));
app.use(bundler.middleware());

app.listen(
  DEVSERVER_PORT,
  () => console.log(`Development server listening on port ${DEVSERVER_PORT}`), // eslint-disable-line no-console
);
