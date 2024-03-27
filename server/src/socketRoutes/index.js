import Logger from 'logger';
import { handleConnected, handleDisconnected } from './connectionEvents';

export default (socket) => {
  if (!socket.request.session.userID) {
    Logger.warn('User does not have a session. Socket rejected');
    socket.emit('unAuthenticated', 'User does not have a session. Socket rejected');
    socket.disconnect();
  }

  handleConnected(socket);
  handleDisconnected(socket);
};
