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

  socket.on('reLogged', async (_id) => {
    try {
      await addUserSocketId(_id, socket.id);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('userLiked', async ({ user, userLikedId }) => {
    try {
      await emitToUserConnected(socket, user, userLikedId, 'gotLiked');
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('userFriended', async ({ user, userLikedId }) => {
    try {
      await emitToUserConnected(socket, user, userLikedId, 'gotFriended');
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });
  socket.on('userUnfriended', async ({ user, userBlockedId }) => {
    try {
      await emitToUserConnected(socket, user, userBlockedId, 'gotUnfriended');
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('logout', async () => {
    try {
      await removeUserSocketId(socket.id);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('disconnect', async () => {
    try {
      await removeUserSocketId(socket.id);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });
};

module.exports = socketEvents;
