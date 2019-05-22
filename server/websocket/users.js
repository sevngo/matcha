const { append, reject, includes, omit, path } = require('ramda');
const { getIds, addCreatedAt } = require('../utils/functions');

let users = [];

exports.addUser = (socketId, user) => {
  users = append({ socketId, ...user })(users);
};

exports.removeUserBySocketId = socketId => () => {
  users = reject(object => socketId === object.socketId)(users);
};

exports.emitToFriendsConnected = (io, friends, eventName) => {
  const friendsIds = getIds(friends);
  const usersIds = getIds(users);
  usersIds.forEach((userId, index) => {
    if (includes(userId)(friendsIds)) {
      const user = addCreatedAt(omit(['socketId'])(users[index]));
      const socketId = path([index, 'socketId'])(users);
      io.to(socketId).emit(eventName, user);
    }
  });
};
