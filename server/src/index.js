// This has to be done first, do not move this
import '#root/env-setup.js';

import http from 'http';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { Server as SocketIoServer } from 'socket.io';
import sharedsession from 'express-socket.io-session';

import gameRoutes from '#root/routes/game.js';
import Logger from '#root/logger.js';
import { bootstrapDatabase } from '#root/db/bootstrap/index.js';
import { pingDatabase } from '#root/db/pgClient.js';

const { PORT, SESSION_SECRET, CORS_ORIGIN } = process.env;
const app = express();

const expressSession = session({
  secret: SESSION_SECRET, // A secret key used for signing the session ID cookie
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save sessions that are new, but not modified
  cookie: { secure: false, maxAge: 60000 }, // Use secure cookies, and set the max age (in ms)
});

app.use(expressSession);

app.use(cors({
  // TODO: Change this when we are no longer just local
  origin: CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/game', gameRoutes); // Use game routes

const httpServer = http.createServer(app);

const io = new SocketIoServer(httpServer, {
  cors: {
    origin: CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
});

io.use(sharedsession(expressSession, {
  autoSave: true,
}));

io.on('connection', (socket) => {
  Logger.info('a user connected');

  socket.on('connected', (msg) => {
    Logger.debug(`message: ${msg}`);
    socket.emit('serverMessage', 'Hello World');
  });

  socket.on('disconnect', () => {
    Logger.info('user disconnected');
  });
});

const startServer = async () => {
  try {
    await bootstrapDatabase();
    await pingDatabase();
    httpServer.listen(PORT, () => Logger.info(`Server running on port ${PORT}`));
  } catch (error) {
    Logger.error('Failed to start the server:', error);
  }
};

startServer();
