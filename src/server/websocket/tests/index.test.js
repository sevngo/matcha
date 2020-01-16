const clientIo = require('socket.io-client');
const PORT = process.env.PORT || 3000;
const http = require('http').createServer();
const serverIo = require('socket.io')(http);
const socketEvents = require('..');

const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
};

let sender;

jest.mock('../../database', () => ({
  getUsers: () => ({ findOneAndUpdate: () => ({}) }),
}));

beforeAll(() => {
  http.listen(PORT);
});

afterAll(() => {
  sender.disconnect();
  http.close();
});

describe('Websocket', () => {
  it('should connect client to server socket io', done => {
    const { address, port } = http.address();
    serverIo.on('connect', socketEvents);

    sender = clientIo(`http://[${address}]:${port}`, ioOptions);
    sender.on('connect', () => {
      done();
    });
  });
});
