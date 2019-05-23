const {
  addUser,
  removeUserBySocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('login', user => {
      addUser(socket.id, user._id);
      emitToFriendsConnected(io, user, 'friendLogged');
    });

    socket.on('likeUser', ({ user, userLikedId }) => {
      emitToUserConnected(io, user, userLikedId, 'userLiked');
    });

    socket.on('blockUser', ({ user, userBlockedId }) => {
      emitToUserConnected(io, user, userBlockedId, 'userBlocked');
    });

    socket.on('logout', removeUserBySocketId(socket.id));
    socket.on('disconnect', removeUserBySocketId(socket.id));
  });
};

module.exports = socketEvents;
