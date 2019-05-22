const { pick } = require('ramda');
const { addUser, removeUserBySocketId, emitToFriendsConnected } = require('./users');

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('login', user => {
      addUser(socket.id, pick(['_id', 'username'])(user));
      emitToFriendsConnected(io, user.friends, 'friendConnected');
    });
    socket.on('logout', removeUserBySocketId(socket.id));
    socket.on('disconnect', removeUserBySocketId(socket.id));
  });
};

module.exports = socketEvents;
