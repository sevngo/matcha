const { append, reject, includes, omit, path } = require('ramda');
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

exports.emitToFriendsConnected = (io, friends, eventName) => {
  const friendsIds = getIds(friends);
  const usersIds = getIds(users);
  usersIds.forEach((userId, index) => {
    if (includes(userId)(friendsIds)) {
      io.to(path([index, 'socketId'])(users)).emit(eventName, omit(['socketId'])(users[index]));
    }
  });
};
