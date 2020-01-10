const clientIo = require('socket.io-client');
const PORT = process.env.PORT || 3000;
const http = require('http').createServer();
const serverIo = require('socket.io')(http);
const socketEvents = require('..');
const { connectDb, disconnectDb } = require('../../database');

const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
};

let sender;

beforeAll(connectDb);

afterAll(disconnectDb);

beforeEach(done => {
  http.listen(PORT);
  const { address, port } = http.address();
  serverIo.on('connect', socketEvents);

  sender = clientIo(`http://[${address}]:${port}`, ioOptions);
  sender.on('connect', () => {
    done();
  });
});

afterEach(() => {
  sender.disconnect();
  http.close();
});

describe('Websocket', () => {
  it('example', done => {
    // sender.emit('userLiked', {});
    done();
  });
});
