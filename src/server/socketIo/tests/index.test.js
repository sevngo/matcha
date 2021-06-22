import socketEvents from '..';

import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';

describe('Socket Io Server', () => {
  let io, clientSocket1, clientSocket2;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket1 = new Client(`http://localhost:${port}`);
      clientSocket2 = new Client(`http://localhost:${port}`);
      io.on('connection', socketEvents);
      clientSocket1.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket1.close();
    clientSocket2.close();
  });

  test('should send notification to client', (done) => {
    const clientSocket1ID = '60084a46203c4e342b13114c';
    const notification = {
      id: 'c7834869-9f05-4c79-9f49-843d7c032f02',
      event: 'gotLiked',
      user: { _id: '60084a46203c4e342b13117p', username: 'steven1' },
    };
    clientSocket1.on('notification', (newNotification) => {
      expect(newNotification).toEqual(notification);
      done();
    });
    clientSocket1.emit('logged', clientSocket1ID);
    clientSocket2.emit('notification', notification, clientSocket1ID);
  });
});
