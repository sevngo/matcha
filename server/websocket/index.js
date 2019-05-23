const {
  addUser,
  removeUserBySocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('logged', user => {
      addUser(socket.id, user._id);
      emitToFriendsConnected(io, user, 'friendLogged');
    });

    socket.on('userLiked', ({ user, userLikedId }) => {
      emitToUserConnected(io, user, userLikedId, 'gotLiked');
    });

    socket.on('userBlocked', ({ user, userBlockedId }) => {
      emitToUserConnected(io, user, userBlockedId, 'gotBlocked');
    });

    socket.on('logout', removeUserBySocketId(socket.id));
    socket.on('disconnect', removeUserBySocketId(socket.id));
  });
};

module.exports = socketEvents;
