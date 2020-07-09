const socketIo = require('socket.io');
const { connectDb } = require('./database');
const app = require('./app');
const { SERVER_PORT } = require('./utils/env');
const pino = require('./utils/logger');
const socketEvents = require('./websocket');

(async () => {
  try {
    await connectDb();
    const server = await app.listen(SERVER_PORT, () =>
      pino.logger.info(`Server listening on port ${SERVER_PORT}`)
    );
    const io = socketIo(server, { pingTimeout: 60000 });
    io.on('connect', socketEvents);
  } catch (err) {
    pino.logger.error(err.stack);
  }
})();
