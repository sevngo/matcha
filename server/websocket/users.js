const { append, reject, includes, omit } = require('ramda');
const { getIds } = require('../utils/functions');

let users = [];

exports.addUser = (_id, socketId) => {
  users = append({ _id, socketId })(users);
  return users;
};

exports.removeUserById = _id => {
  users = reject(object => _id === object._id)(users);
  return users;
};

exports.removeUserBySocketId = socketId => {
  users = reject(object => socketId === object.socketId)(users);
  return users;
};

exports.emitToFriends = (io, friends, eventName) => {
  const friendsIds = getIds(friends);
  const usersIds = getIds(users);
  usersIds.forEach((userId, index) => {
    if (includes(userId)(friendsIds)) {
      io.to(users[index].socketId).emit(eventName, omit(['socketId'])(users[index]));
    }
  });
};
