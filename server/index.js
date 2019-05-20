const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const { connectDb } = require('./database');
const { PORT } = require('./utils/constants');

const server = http.createServer(app);
const io = socketIo(server);

(async () => {
  try {
    await connectDb();
    await server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line no-console
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();

io.on('connection', () => {
  // console.log('new websocket connection');
});
