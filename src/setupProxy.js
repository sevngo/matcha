const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://localhost:${process.env.REACT_APP_PROXY_PORT}`,
    }),
  );
};
