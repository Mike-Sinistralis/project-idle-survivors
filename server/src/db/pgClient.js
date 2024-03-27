import pg from 'pg';

import Logger from 'logger.js';

const { Pool } = pg;

const pool = new Pool({
  // TODO: Don't give the app access to the postgres user in the future
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: process.env.DB_MAX_CONNECTIONS || 20,
});

const pingDatabase = async () => {
  try {
    await pool.query('SELECT 1');
    // If the query succeeds, the connection is good
    Logger.info(`Successfully connected to ${process.env.DB_HOST}:${process.env.DB_PORT} as ${process.env.DB_USER}.`);
    return true;
  } catch (error) {
    // If the query fails, log the error
    Logger.error('Database connection failed.', error);
    return false;
  }
};

export { pool, pingDatabase };
