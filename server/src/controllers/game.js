import bcrypt from 'bcrypt';
import { pool } from '#root/db/pgClient.js';
import Logger from '#root/logger.js';

const getSavedGame = async (req, res) => {
  Logger.info(req);
  if (req.session.userID) {
    try {
      const { rows } = await pool.query('SELECT save FROM public.user WHERE "userID" = $1', [req.session.userID]);
      if (rows.length !== 1) {
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        const row = rows[0];
        res.send({ save: row.save });
      }
    } catch (error) {
      Logger.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    Logger.info(req.session);
    res.status(401).send('Not authenticated');
  }
};

const saveGame = async (req, res) => {
  res.status(500).json({ error: 'Not implemented yet dumdum' });
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { rows } = await pool.query('INSERT INTO public.user (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(200).json(rows);
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userResult = await pool.query('SELECT "userID", username, password FROM public.user WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      res.status(401).send('Authentication failed');
    } else {
      const user = userResult.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).send('Authentication failed');
      } else {
        req.session.userID = user.userID;
        Logger.info(user, req.session);
        req.session.save((err) => { // Force save session
          if (err) {
            res.status(500).send('Could not save session');
          } else {
            res.send({ sessionKey: req.sessionID });
          }
        });
      }
    }
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getSavedGame,
  saveGame,
  register,
  login,
};
