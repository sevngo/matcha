const { append, reject } = require('ramda');

let usersConnected = [];

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('login', user => {
      usersConnected = append({ _id: user._id, socketId: socket.id })(usersConnected);
    });
    socket.on('logout', _id => {
      usersConnected = reject(user => _id === user._id)(usersConnected);
    });
    socket.on('disconnect', () => {
      usersConnected = reject(user => socket.id === user.socketId)(usersConnected);
    });
  });
};

module.exports = socketEvents;
