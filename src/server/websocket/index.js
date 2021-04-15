import { createNotification } from '../utils/functions.js';

const socketEvents = (socket) => {
  socket.on('logged', (senderId) => socket.join(senderId));

  socket.on('reLogged', (senderId) => socket.join(senderId));

  socket.on('userLiked', (sender, receiverId) => {
    const notification = createNotification(sender);
    if (socket.adapter.rooms.has(receiverId))
      socket.to(receiverId).emit('gotLiked', notification);
  });

  socket.on('userFriended', (sender, receiverId) => {
    const notification = createNotification(sender);
    if (socket.adapter.rooms.has(receiverId))
      socket.to(receiverId).emit('gotFriended', notification);
  });
  socket.on('userUnfriended', (sender, receiverId) => {
    const notification = createNotification(sender);
    if (socket.adapter.rooms.has(receiverId))
      socket.to(receiverId).emit('gotUnfriended', notification);
  });

  socket.on('logout', (senderId) => socket.leave(senderId));
};

export default socketEvents;
