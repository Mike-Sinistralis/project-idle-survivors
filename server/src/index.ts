// This has to be done first, do not move this
import 'env-setup.js';

import http from 'http';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { Server as SocketIoServer } from 'socket.io';

import connectPgSimple from 'connect-pg-simple';
import { pool } from 'db/pgClient.js';

import Logger from 'logger.js';
import { bootstrapDatabase } from 'db/bootstrap/index.js';
import { pingDatabase } from 'db/pgClient.js';

import authRoutes from 'routes/auth.js';
import gameRoutes from 'routes/game.js';
import userRoutes from 'routes/user.js';
import socketRoutes from 'socketRoutes';

const { PORT, SESSION_SECRET, CORS_ORIGIN } = process.env;
const app = express();

const PgSession = connectPgSimple(session);

const expressSession = session({
  store: new PgSession({
    pool, // Use your existing PostgreSQL pool
    tableName: 'user-session', // Optional. Use a different table name if you prefer
  }),
  secret: SESSION_SECRET, // A secret key used for signing the session ID cookie
  resave: true, // Don't save session if unmodified
  saveUninitialized: true, // Save sessions that are new, but not modified
  // TODO: Base secure off environment
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // Use secure cookies, and set the max age (in ms)
  rolling: true,
});

app.use(expressSession);

app.use(cors({
  // TODO: Change this when we are no longer just local
  origin: CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/user', userRoutes);

const httpServer = http.createServer(app);

const io = new SocketIoServer(httpServer, {
  cors: {
    origin: CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
});

io.engine.use(expressSession);

io.on('connection', (socket) => {
  socketRoutes(socket);
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

/*
  @link chrome://inspect
*/
startServer();
