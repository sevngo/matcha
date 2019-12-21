const socketIo = require('socket.io');
const { connectDb } = require('./database');
const app = require('./app');
const { SERVER_PORT } = require('./utils/constants');
const socketEvents = require('./websocket');

(async () => {
  try {
    await connectDb();
    const server = await app.listen(SERVER_PORT, () =>
      console.log(`Server listening on port ${SERVER_PORT}`),
    ); // eslint-disable-line no-console
    const io = socketIo(server, { pingTimeout: 60000 });
    socketEvents(io);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
