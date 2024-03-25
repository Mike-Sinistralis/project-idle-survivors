import bcrypt from 'bcrypt';
import Logger from '#root/logger.js';

import { createAccount, getAccountByUsername } from '#root/managers/authManager.js';
import { destroySession, initializeSession } from '#root/managers/sessionManager.js';

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    await createAccount(username, password);

    res.status(200).json({ message: 'User created', usename: username });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'User either exists or encounted an unknown error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user } = await getAccountByUsername(username);

    if (!user) {
      Logger.error(`User ${username} not found`);
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      Logger.error(`Password mismatch for user ${username}`);
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const sessionKey = await initializeSession(req, user);

    res.status(200).json({ sessionKey });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  destroySession(req);
  res.send({ message: 'Logged out' });
};

export {
  register,
  login,
  logout,
};
