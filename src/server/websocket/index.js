import { createNotification } from '../utils/functions.js';

const socketEvents = (socket) => {
  socket.on('logged', (sender, receiversIds) => {
    socket.join(sender._id);
    const notification = createNotification(sender);
    socket.to(receiversIds).emit('friendLogged', notification);
  });

  socket.on('reLogged', (senderId) => socket.join(senderId));

  socket.on('userLiked', (sender, receiverId) => {
    const notification = createNotification(sender);
    socket.to(receiverId).emit('gotLiked', notification);
  });

  socket.on('userFriended', (sender, receiverId) => {
    const notification = createNotification(sender);
    socket.to(receiverId).emit('gotFriended', notification);
  });
  socket.on('userUnfriended', (sender, receiverId) => {
    const notification = createNotification(sender);
    socket.to(receiverId).emit('gotUnfriended', notification);
  });

  socket.on('logout', (senderId) => socket.leave(senderId))
};

export default socketEvents;
