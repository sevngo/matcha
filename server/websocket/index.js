const { addUser, removeUserById, removeUserBySocketId, emitToFriends } = require('./users');

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('login', user => {
      addUser(user._id, socket.id);
      emitToFriends(io, user.friends, 'friendConnected');
    });
    socket.on('logout', removeUserById);
    socket.on('disconnect', () => removeUserBySocketId(socket.id));
  });
};

module.exports = socketEvents;
