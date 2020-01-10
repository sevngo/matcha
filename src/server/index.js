const socketIo = require('socket.io');
const { connectDb } = require('./database');
const app = require('./app');
const { PORT } = require('./utils/constants');
const socketEvents = require('./websocket');

(async () => {
  try {
    await connectDb();
    const server = await app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line no-console
    const io = socketIo(server, { pingTimeout: 60000 });
    io.on('connect', socketEvents);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
