import Logger from 'logger';

export function handleConnected(socket) {
  socket.on('connected', (msg) => {
    Logger.debug(`message: ${msg}`);
    socket.emit('serverMessage', 'Hello World');
  });
}

export function handleDisconnected(socket) {
  socket.on('disconnect', () => {
    Logger.info('user disconnected');
  });
}
