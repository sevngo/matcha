import pino from '../utils/logger.js';
import { createNotification } from '../utils/functions.js';

const socketEvents = (socket) => {
  socket.on('logged', async ({ sender, receiversIds }) => {
    try {
      socket.join(sender._id);
      const notification = createNotification({ sender });
      receiversIds.forEach((receiverId) => socket.to(receiverId).emit('friendLogged', notification));
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('reLogged', async (senderId) => {
    try {
      socket.join(senderId);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('userLiked', async ({ sender, receiverId }) => {
    try {
      const notification = createNotification(sender);
      socket.to(receiverId).emit('gotLiked', notification);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('userFriended', async ({ sender, receiverId }) => {
    try {
      const notification = createNotification(sender);
      socket.to(receiverId).emit('gotFriended', notification);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });
  socket.on('userUnfriended', async ({ sender, receiverId }) => {
    try {
      const notification = createNotification(sender);
      socket.to(receiverId).emit('gotUnfriended', notification);
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });

  socket.on('logout', async (senderId) => {
    try {
      await socket.leave(senderId)
    } catch (err) {
      pino.logger.error(err.stack);
    }
  });
};

export default socketEvents;
