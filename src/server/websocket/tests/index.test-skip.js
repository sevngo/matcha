const clientIo = require('socket.io-client');
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
  http.listen(0);
});

afterAll(() => {
  sender.disconnect();
  http.close();
});

describe('Websocket', () => {
  it('should connect client to server socket io', (done) => {
    const { port } = http.address();
    serverIo.on('connect', socketEvents);

    sender = clientIo(`http://localhost:${port}`, ioOptions);
    sender.on('connect', () => {
      done();
    });
  });
});
