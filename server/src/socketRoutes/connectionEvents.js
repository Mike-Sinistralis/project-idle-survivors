import Logger from 'logger';

export function handleConnected(socket) {
  socket.on('connected', () => {
    Logger.info(`${socket.request.session.userName} has connected`);
    socket.emit('serverMessage', 'Hello World');
  });
}

export function handleDisconnected(socket) {
  socket.on('disconnect', () => {
    Logger.info(`${socket.request.session.userName} has disconnected`);
  });
}
