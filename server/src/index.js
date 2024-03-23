// Importing dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Creating an Express application
const app = express();

// Creating a server for the app
const server = http.createServer(app);

// Integrating Socket.io with the server
const io = socketIo(server, {
  // options if needed
});

// Example of an Express route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handling a connection event for Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle other events like chat messages, position updates, etc.
});

// Setting the server to listen on a port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});