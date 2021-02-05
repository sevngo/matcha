import mongodb from 'mongodb';
import map from 'ramda';
import {
  getIds,
  createNotification,
  getSocketIds,
} from '../utils/functions.js';
import { getUsers } from '../database.js';

const { ObjectID } = mongodb;

export const addUserSocketId = async (_id, socketId) => {
  const Users = getUsers();
  await Users.findOneAndUpdate({ _id: ObjectID(_id) }, { $set: { socketId } });
};

export const removeUserSocketId = async (socketId) => {
  const Users = getUsers();
  await Users.findOneAndUpdate({ socketId }, { $unset: { socketId: '' } });
};

export const emitToFriendsConnected = async (io, data, friends, eventName) => {
  const Users = getUsers();
  const friendsIds = map((id) => ObjectID(id))(getIds(friends));
  const friendsConnected = await Users.aggregate()
    .match({ _id: { $in: friendsIds } })
    .match({ sockerId: { $exists: true } })
    .toArray();
  const friendsSocketIds = getSocketIds(friendsConnected);
  friendsSocketIds.forEach((friendSocketId) => {
    const notification = createNotification(data);
    io.to(friendSocketId).emit(eventName, notification);
  });
};

export const emitToUserConnected = async (io, data, receiverId, eventName) => {
  const _id = ObjectID(receiverId);
  const Users = getUsers();
  const [userConnected] = await Users.aggregate()
    .match({ _id })
    .match({ sockerId: { $exists: true } })
    .toArray();
  if (userConnected) {
    const notification = createNotification(data);
    io.to(userConnected.socketId).emit(eventName, notification);
  }
};
