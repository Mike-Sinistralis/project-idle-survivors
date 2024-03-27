import Logger from 'logger';
import { handleConnected, handleDisconnected } from './connectionEvents';

export default (socket) => {
  Logger.info('a user connected');

  handleConnected(socket);
  handleDisconnected(socket);
};
