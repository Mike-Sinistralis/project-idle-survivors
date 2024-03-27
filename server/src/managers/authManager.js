import bcrypt from 'bcrypt';

import { pool } from 'db/pgClient.js';
import Logger from 'logger.js';

const createAccount = async (username, password) => {
  Logger.info(`Creating account for ${username}`);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return pool.query('INSERT INTO public.user (username, password) VALUES ($1, $2)', [username, hashedPassword]);
};

const getAccountByUsername = async (username) => {
  Logger.info(`Looking up account for ${username} for login`);
  const userResult = await pool.query('SELECT "userID", username, password FROM public.user WHERE username = $1', [username]);

  return { user: userResult?.rows[0] || null };
};

export {
  createAccount,
  getAccountByUsername,
};
