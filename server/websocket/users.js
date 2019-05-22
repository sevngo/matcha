const { append, reject, includes, pick, path } = require('ramda');
const { getIds, addCreatedAt } = require('../utils/functions');

let usersConnected = [];

exports.addUser = (socketId, user) => {
  usersConnected = append({ socketId, ...user })(usersConnected);
};

exports.removeUserBySocketId = socketId => () => {
  usersConnected = reject(object => socketId === object.socketId)(usersConnected);
};

exports.emitToFriendsConnected = (io, friends, eventName) => {
  const friendsIds = getIds(friends);
  const usersConnectedIds = getIds(usersConnected);
  usersConnectedIds.forEach((userConnectedId, index) => {
    if (includes(userConnectedId)(friendsIds)) {
      const user = addCreatedAt(pick(['_id', 'username'])(usersConnected[index]));
      const socketId = path([index, 'socketId'])(usersConnected);
      io.to(socketId).emit(eventName, user);
    }
  });
};

// exports.emitToUserConnected = (io ,) => {
//   find(userConnected => userConnected._id === user._id)(usersConnected);
// }
