const Bundler = require('parcel-bundler');
const app = require('express')();
const proxy = require('http-proxy-middleware');
const path = require('path');

const PORT = process.env.DEVSERVER_PORT;
const bundler = new Bundler(path.join(__dirname, '..', 'index.html'));

app.use('/api', proxy({ target: `http://localhost:${process.env.PORT}`, changeOrigin: true }));
app.use(bundler.middleware());

app.listen(PORT, () => console.log(`Development server listening on port ${PORT}`)); // eslint-disable-line no-console
