const {
  addUserSocketId,
  removeUserSocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');

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
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('reLogged', (_id) => {
    try {
      addUserSocketId(_id, socket.id);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('userLiked', ({ user, userLikedId }) => {
    try {
      emitToUserConnected(socket, user, userLikedId, 'gotLiked');
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('userFriended', ({ user, userLikedId }) => {
    try {
      emitToUserConnected(socket, user, userLikedId, 'gotFriended');
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('userBlocked', ({ user, userBlockedId }) => {
    try {
      emitToUserConnected(socket, user, userBlockedId, 'gotBlocked');
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('userUnfriended', ({ user, userBlockedId }) => {
    try {
      emitToUserConnected(socket, user, userBlockedId, 'gotUnfriended');
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('logout', () => {
    try {
      removeUserSocketId(socket.id);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('disconnect', () => {
    try {
      removeUserSocketId(socket.id);
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = socketEvents;
