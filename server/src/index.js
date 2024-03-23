const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  // https://socket.io/docs/v4/server-options
});

// Example of an Express route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handling a connection event for Socket.io
io.on('connection', (socket) => {
  console.log('a user connected');

  // Echo back "Hello World" whenever a message is received
  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    socket.emit('message', 'Hello World');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Setting the server to listen on a port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});