import { io } from 'socket.io-client';

const socket = io(`${import.meta.env.VITE_API_URL}`, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000, // Reconnecting tapers off, this is the max value it will taper off to
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('connected', 'Hello from client');
});

socket.on('serverMessage', (msg) => {
  console.log(`Message from server: ${msg}`);
});
