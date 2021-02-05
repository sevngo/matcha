import ioClient from 'socket.io-client';
import http from 'http';
import { Server as io } from 'socket.io';
import socketEvents from '..';

const ioOptions = {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false,
};

let socketClient;
let httpServer;
let ioServer;

jest.mock('../../database', () => ({
  getUsers: () => ({ findOneAndUpdate: () => ({}) }),
}));

beforeAll((done) => {
  httpServer = http.createServer();
  ioServer = new io(httpServer);
  httpServer.listen(0, done);
});

afterAll((done) => {
  socketClient.disconnect();
  httpServer.close(done);
});

describe('Websocket', () => {
  it('should connect client to server socket io', (done) => {
    const { port } = httpServer.address();
    ioServer.on('connect', socketEvents);

    socketClient = ioClient(`http://localhost:${port}`, ioOptions);
    socketClient.on('connect', done);
  });
});
