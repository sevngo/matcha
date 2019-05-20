const http = require('http');
const socketIo = require('socket.io');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { connectDb } = require('./database');
const { PORT } = require('./utils/constants');
const usersRouter = require('./routers/users');
const { NODE_ENV, DEVELOPMENT, PRODUCTION, TEST } = require('./utils/constants');

const app = express();

app.use(express.json());

if (NODE_ENV === DEVELOPMENT) app.use(morgan('dev'));

app.use('/api/users', usersRouter);

if (NODE_ENV === PRODUCTION) {
  app.use(express.static('dist'));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));
}

const server = http.createServer(app);
const io = socketIo(server);

if (NODE_ENV !== TEST) {
  (async () => {
    try {
      await connectDb();
      await server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line no-console
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
    }
  })();
}

io.on('connection', () => {
  // console.log('new websocket connection');
});

module.exports = app;
