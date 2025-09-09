import { Server } from 'socket.io';

export function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    socket.on('chatMessage', (msg) => {
      console.log(`📩 Message from ${socket.id}:`, msg);
      io.emit('chatMessage', { from: socket.id, text: msg });
    });

    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
}
