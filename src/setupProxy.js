const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    proxy({
      target: `http://localhost:${process.env.REACT_APP_PROXY_PORT}`,
    }),
  );
};
