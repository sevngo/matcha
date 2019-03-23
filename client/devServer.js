const Bundler = require('parcel-bundler');
const app = require('express')();
const proxy = require('http-proxy-middleware');
const path = require('path');

const PORT = 3000;

const bundler = new Bundler(path.join(__dirname, 'index.html'), {});
app.use(bundler.middleware());

app.use(proxy({ target: 'http://localhost:8080' }));

app.listen(PORT, () => console.log(`Development server listening on port ${PORT}`));
