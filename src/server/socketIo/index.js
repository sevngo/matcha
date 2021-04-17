const socketEvents = (socket) => {
  socket.on('logged', (senderId) => socket.join(senderId));

  socket.on('notification', (notification, receiverId) => {
    if (socket.adapter.rooms.has(receiverId))
      socket.to(receiverId).emit('notification', notification);
  });

  socket.on('logout', (senderId) => socket.leave(senderId));
};

export default socketEvents;
