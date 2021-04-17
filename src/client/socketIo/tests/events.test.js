import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { getAuthFriends, getAuthNotifications } from '../../selectors/auth';
import store from '../../store';
import socketEvents from '../events';

const initialState = {
  auth: {
    _id: '60084a46203c4e342b13114c',
    friends: [{ _id: '60084a46aflr4e342b13065p', username: 'steven0' }],
  },
};

jest.mock('../../utils/localStorage', () => ({
  loadState: () => initialState,
  saveState: jest.fn(),
}));

describe('Socket Io Server', () => {
  let io, clientSocket, serverSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      io.on('connection', (socket) => {
        serverSocket = socket;
        serverSocket.on('logged', () => done());
      });
      clientSocket = new Client(`http://localhost:${port}`);
      socketEvents(clientSocket);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  const getNotificationById = (notificationId) => {
    const state = store.getState();
    const notifications = getAuthNotifications(state);
    const notification = notifications.find(({ id }) => id === notificationId);
    return notification;
  };

  const getFriendById = (friendId) => {
    const state = store.getState();
    const friends = getAuthFriends(state);
    const friend = friends.find(({ _id }) => _id === friendId);
    return friend;
  };

  describe('notification', () => {
    test('should get a new notification', (done) => {
      const notification = {
        id: 'c7834869-9f05-4c79-9f49-843d7c032f02',
        event: 'gotLiked',
        user: { _id: '60084a46203c4e342b13117p', username: 'steven1' },
      };
      const notificationInState = getNotificationById(notification.id);
      expect(notificationInState).toBeUndefined();
      serverSocket.emit('notification', notification);
      clientSocket.on('notification', () => {
        const notificationInState = getNotificationById(notification.id);
        expect(notificationInState).toEqual(notification);
        done();
      });
    });

    test('should get a new friend and a new notification', (done) => {
      const notification = {
        id: 'c7834869-qwdj-qwdj-qwdj-843d7c032f094',
        event: 'gotFriended',
        user: { _id: '60084a46aflr4e342b13117p', username: 'steven2' },
      };
      const notificationInState = getNotificationById(notification.id);
      expect(notificationInState).toBeUndefined();
      serverSocket.emit('notification', notification);
      clientSocket.on('notification', () => {
        const notificationInState = getNotificationById(notification.id);
        expect(notificationInState).toEqual(notification);
        const friend = getFriendById(notification.user._id);
        expect(friend).toEqual(notification.user);
        done();
      });
    });

    test('should delete a friend and get a new notification', (done) => {
      const notification = {
        id: 'c7834869-pokl-pokl-pokl-843d7c032f094',
        event: 'gotUnfriended',
        user: { _id: '60084a46aflr4e342b13065p', username: 'steven0' },
      };
      const notificationInState = getNotificationById(notification.id);
      expect(notificationInState).toBeUndefined();
      const friend = getFriendById(notification.user._id);
      expect(friend).toEqual(notification.user);
      serverSocket.emit('notification', notification);
      clientSocket.on('notification', () => {
        const notificationInState = getNotificationById(notification.id);
        expect(notificationInState).toEqual(notification);
        const friend = getFriendById(notification.user._id);
        expect(friend).toBeUndefined();
        done();
      });
    });
  });
});
