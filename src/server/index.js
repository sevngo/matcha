import { Server as socketIo } from 'socket.io';
import { connectDb } from './database.js';
import app from './app.js';
import pino from './utils/logger.js';
import { SERVER_PORT } from './utils/env.js';
import socketEvents from './websocket/index.js';

(async () => {
  try {
    await connectDb();
    const server = await app.listen(SERVER_PORT, () =>
      pino.logger.info(`Server listening on port ${SERVER_PORT}`)
    );
    const io = new socketIo(server, {
      cors: {
        origin: `http://localhost:3000`,
        methods: ['GET', 'POST'],
      },
    });
    io.on('connect', socketEvents);
  } catch (err) {
    pino.logger.error(err.stack);
  }
})();
