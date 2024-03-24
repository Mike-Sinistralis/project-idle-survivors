import '#root/env-setup.js';

import http from 'http';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { Server as SocketIoServer } from 'socket.io';
import gameRoutes from '#root/routes/game.js';

const app = express();

const { SECRET } = process.env;
app.use(session({
  secret: SECRET, // A secret key used for signing the session ID cookie
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save sessions that are new, but not modified
  cookie: { secure: false, maxAge: 60000 }, // Use secure cookies, and set the max age (in ms)
}));

app.use(cors({
  // TODO: Change this when we are no longer just local
  origin: 'http://localhost:5173',
  credentials: true,
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
