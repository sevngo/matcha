const {
  addUserSocketId,
  removeUserSocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');
const pino = require('../utils/logger');

const socketEvents = (socket) => {
  socket.on('logged', async ({ friends, _id, username }) => {
    try {
      await addUserSocketId(_id, socket.id);
      if (friends)
        await emitToFriendsConnected(
          socket,
          { _id, username },
          friends,
          'friendLogged'
        );
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('reLogged', (_id) => {
    try {
      addUserSocketId(_id, socket.id);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('userLiked', ({ user, userLikedId }) => {
    try {
      emitToUserConnected(socket, user, userLikedId, 'gotLiked');
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('userFriended', ({ user, userLikedId }) => {
    try {
      emitToUserConnected(socket, user, userLikedId, 'gotFriended');
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });
  socket.on('userUnfriended', ({ user, userBlockedId }) => {
    try {
      emitToUserConnected(socket, user, userBlockedId, 'gotUnfriended');
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('logout', () => {
    try {
      removeUserSocketId(socket.id);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('disconnect', () => {
    try {
      removeUserSocketId(socket.id);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });
};

module.exports = socketEvents;
