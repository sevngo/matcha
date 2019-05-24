const { find } = require('ramda');
const {
  addUser,
  removeUserBySocketId,
  emitToFriendsConnected,
  emitToUserConnected,
} = require('./users');
const { getIds } = require('../utils/functions');

const socketEvents = io => {
  io.on('connection', socket => {
    socket.on('logged', user => {
      addUser(socket.id, user._id);
      emitToFriendsConnected(io, user, 'friendLogged');
    });

    socket.on('userLiked', ({ user: { _id, username, friends }, userLikedId }) => {
      const data = { _id, username };
      emitToUserConnected(io, data, userLikedId, 'gotLiked');
      const isFriend = checkIsFriend(userLikedId, friends);
      if (isFriend) emitToUserConnected(io, data, userLikedId, 'gotNewFriend');
    });

    socket.on('userBlocked', ({ user: { _id, username, friends }, userBlockedId }) => {
      const data = { _id, username };
      emitToUserConnected(io, data, userBlockedId, 'gotBlocked');
      const isFriend = checkIsFriend(userBlockedId, friends);
      if (isFriend) emitToUserConnected(io, data, userBlockedId, 'gotUnfriended');
    });

    socket.on('logout', removeUserBySocketId(socket.id));
    socket.on('disconnect', removeUserBySocketId(socket.id));
  });
};

const checkIsFriend = (userId, friends) => {
  const friendsIds = getIds(friends);
  const isFriend = find(friendId => userId === friendId)(friendsIds);
  return isFriend;
};

module.exports = socketEvents;
