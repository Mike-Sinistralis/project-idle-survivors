import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import clientLogout from 'util/logout';

const socketConfig = {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  withCredentials: true,
};

let socket;

export const connectSocket = () => {
  socket = io(`${import.meta.env.VITE_API_URL}`, socketConfig);

  socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('connected', 'Hello from client');
  });

  socket.on('serverMessage', (msg) => {
    console.log(`Message from server: ${msg}`);
  });

  socket.on('unAuthenticated', (msg) => {
    console.log(`Unauthenticated: ${msg}`);

    if (import.meta.env.VITE_ENABLE_WEBSOCKET_401) {
      clientLogout();
    } else {
      toast.error('Socket connection closed due to invalid session');
    }
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
