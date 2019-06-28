const http = require('http');
const socketIo = require('socket.io');
const { connectDb } = require('./database');
const app = require('./app');
const { PORT } = require('./utils/constants');
const socketEvents = require('./websocket');

const server = http.createServer(app);
const io = socketIo(server);
socketEvents(io);

(async () => {
  try {
    await connectDb();
    await server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line no-console
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
