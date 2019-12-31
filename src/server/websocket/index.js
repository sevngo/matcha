const {
  addUserSocketId,
  removeUserSocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');

const socketEvents = io => {
  io.on('connect', socket => {
    socket.on('logged', async user => {
      await addUserSocketId(user._id, socket.id);
      await emitToFriendsConnected(io, user, 'friendLogged');
    });

    socket.on('reLogged', user => addUserSocketId(user._id, socket.id));

    socket.on('userLiked', ({ user, userLikedId }) =>
      emitToUserConnected(io, user, userLikedId, 'gotLiked'),
    );

    socket.on('userFriended', ({ user, userLikedId }) =>
      emitToUserConnected(io, user, userLikedId, 'gotFriended'),
    );

    socket.on('userBlocked', ({ user, userBlockedId }) =>
      emitToUserConnected(io, user, userBlockedId, 'gotBlocked'),
    );

    socket.on('userUnfriended', ({ user, userBlockedId }) =>
      emitToUserConnected(io, user, userBlockedId, 'gotUnfriended'),
    );

    socket.on('userVisited', ({ user, userVisitedId }) =>
      emitToUserConnected(io, user, userVisitedId, 'gotVisited'),
    );

    socket.on('logout', () => removeUserSocketId(socket.id));

    socket.on('disconnect', () => removeUserSocketId(socket.id));
  });
};

module.exports = socketEvents;
