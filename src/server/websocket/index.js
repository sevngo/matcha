const {
  addUserSocketId,
  removeUserSocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');

const socketEvents = socket => {
  socket.on('logged', async ({ friends, _id, username }) => {
    await addUserSocketId(_id, socket.id);
    await emitToFriendsConnected(socket, { _id, username }, friends, 'friendLogged');
  });

  socket.on('reLogged', _id => addUserSocketId(_id, socket.id));

  socket.on('userLiked', ({ user, userLikedId }) =>
    emitToUserConnected(socket, user, userLikedId, 'gotLiked'),
  );

  socket.on('userFriended', ({ user, userLikedId }) =>
    emitToUserConnected(socket, user, userLikedId, 'gotFriended'),
  );

  socket.on('userBlocked', ({ user, userBlockedId }) =>
    emitToUserConnected(socket, user, userBlockedId, 'gotBlocked'),
  );

  socket.on('userUnfriended', ({ user, userBlockedId }) =>
    emitToUserConnected(socket, user, userBlockedId, 'gotUnfriended'),
  );

  socket.on('logout', () => removeUserSocketId(socket.id));

  socket.on('disconnect', () => removeUserSocketId(socket.id));
};

module.exports = socketEvents;
