const { append, reject, includes } = require('ramda');
const { getIds } = require('./utils/functions');

let usersConnected = [];

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('login', user => {
      usersConnected = append({ _id: user._id, socketId: socket.id })(usersConnected);
      const friendsIds = getIds(user.friends);
      const usersConnectedIds = getIds(usersConnected);
      usersConnectedIds.forEach((user, index) => {
        if (includes(user)(friendsIds)) {
          io.to(usersConnected[index].socketId).emit('friendConnected');
        }
      });
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
