const { ObjectID } = require('mongodb');
const { map } = require('ramda');
const { getIds, createNotification, getSocketIds } = require('../utils/functions');
const { matchIn, matchField, match } = require('../utils/stages');
const { getUsers } = require('../database');

exports.addUserSocketId = async (_id, socketId) => {
  const Users = getUsers();
  await Users.findOneAndUpdate({ _id: ObjectID(_id) }, { $set: { socketId } });
};

exports.removeUserSocketId = async socketId => {
  try {
    const Users = getUsers();
    await Users.findOneAndUpdate({ socketId }, { $unset: { socketId: '' } });
  } catch (e) {
    console.log(e);
  }
};

exports.emitToFriendsConnected = async (io, data, friends, eventName) => {
  try {
    const Users = getUsers();
    const friendsIds = map(id => ObjectID(id))(getIds(friends));
    const friendsConnected = await Users.aggregate([
      matchIn('_id', friendsIds),
      matchField('socketId'),
    ]).toArray();
    const friendsSocketIds = getSocketIds(friendsConnected);
    friendsSocketIds.forEach(friendSocketId => {
      const notification = createNotification(data);
      io.to(friendSocketId).emit(eventName, notification);
    });
  } catch (e) {
    console.log(e);
  }
};

exports.emitToUserConnected = async (io, data, receiverId, eventName) => {
  try {
    const _id = ObjectID(receiverId);
    const Users = getUsers();
    const [userConnected] = await Users.aggregate([
      match('_id', _id),
      matchField('socketId'),
    ]).toArray();
    if (userConnected) {
      const notification = createNotification(data);
      io.to(userConnected.socketId).emit(eventName, notification);
    }
  } catch (e) {
    console.log(e);
  }
};
