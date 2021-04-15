import socketEvents from '..';

const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

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

  const clientSocket1ID = '60084a46203c4e342b13114c';
  const user = { _id: clientSocket1ID, username: 'username' };

  test('should get gotLiked event', (done) => {
    clientSocket1.on('gotLiked', (notification) => {
      clientSocket1.emit('logout', clientSocket1ID);
      expect(notification.user).toMatchObject(user);
      done();
    });
    clientSocket1.emit('logged', clientSocket1ID);
    clientSocket2.emit('userLiked', user, clientSocket1ID);
  });
  test('should get gotFriended event', (done) => {
    clientSocket1.on('gotFriended', (notification) => {
      clientSocket1.emit('logout', clientSocket1ID);
      expect(notification.user).toMatchObject(user);
      done();
    });
    clientSocket1.emit('reLogged', clientSocket1ID);
    clientSocket2.emit('userFriended', user, clientSocket1ID);
  });
  test('should get gotUnfriended event', (done) => {
    clientSocket1.on('gotUnfriended', (notification) => {
      clientSocket1.emit('logout', clientSocket1ID);
      expect(notification.user).toMatchObject(user);
      done();
    });
    clientSocket1.emit('logged', clientSocket1ID);
    clientSocket2.emit('userUnfriended', user, clientSocket1ID);
  });
});
