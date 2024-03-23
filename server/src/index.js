import '#root/env-setup.js';

import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server as SocketIoServer } from 'socket.io';
import gameRoutes from '#root/routes/game.js';

const app = express();

app.use(cors({
  // TODO: Change this when we are no longer just local
  origin: '*',
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/game', gameRoutes); // Use game routes

const httpServer = http.createServer(app);

const io = new SocketIoServer(httpServer, {
  cors: {
    // TODO: Change this when we are no longer just local
    origin: '*',
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('connected', (msg) => {
    console.log(`message: ${msg}`);
    socket.emit('serverMessage', 'Hello World');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const { PORT } = process.env;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
