const { append, reject, includes, path, find } = require('ramda');
const { getIds, addCreatedAt } = require('../utils/functions');

let usersConnected = [];

exports.addUser = (socketId, _id) => {
  usersConnected = append({ socketId, _id })(usersConnected);
};

exports.removeUserBySocketId = socketId => () => {
  usersConnected = reject(object => socketId === object.socketId)(usersConnected);
};

exports.emitToFriendsConnected = (io, user, eventName) => {
  const { friends, _id, username } = user;
  const friendsIds = getIds(friends);
  const usersConnectedIds = getIds(usersConnected);
  usersConnectedIds.forEach((userConnectedId, index) => {
    if (includes(userConnectedId)(friendsIds)) {
      const user = addCreatedAt({ _id, username });
      const socketId = path([index, 'socketId'])(usersConnected);
      io.to(socketId).emit(eventName, user);
    }
  });
};

exports.emitToUserConnected = (io, user, userLikedId, eventName) => {
  const userLikedConnected = find(userConnected => userConnected._id === userLikedId)(
    usersConnected,
  );
  if (userLikedConnected) io.to(userLikedConnected.socketId).emit(eventName, addCreatedAt(user));
};
