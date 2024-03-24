import pg from 'pg';

import Logger from '#root/logger.js';
import { bootstrapMigrationsLog } from './_migrations_log.js';
import { bootstrapUsers } from './user.js';

const { Pool } = pg;

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
};

const bootstrapDatabase = async () => {
  if (!(process.env.BOOTSTRAP_DATABASE === 'true')) return;
  Logger.info('Attempting to bootstrap database');

  const pool = new Pool({
    ...config,
    database: 'postgres', // Connect to the default 'postgres' database
  });

  let idleSurvivorsPool;

  try {
    // Check if the 'idle-survivors' database exists
    const res = await pool.query("SELECT 1 FROM pg_database WHERE datname='idle-survivors'");

    if (res.rows.length === 0) {
      Logger.info('No pre-existing database found, beginning bootstrap process');

      // Create the 'idle-survivors' database
      await pool.query('CREATE DATABASE "idle-survivors"');

      // Connect to the new database
      idleSurvivorsPool = new Pool({
        ...config,
        database: 'idle-survivors',
      });

      // Bootstrap tables and data, 1 file per table
      await bootstrapMigrationsLog(idleSurvivorsPool);
      await bootstrapUsers(idleSurvivorsPool);

      Logger.info('Database and table created successfully');
    } else {
      Logger.info('Cannot bootstrap Database as it currently exists. Please drop the database and try again.');
    }
  } catch (error) {
    Logger.error('Error during database bootstrap:', error);
  } finally {
    if (idleSurvivorsPool) {
      await idleSurvivorsPool.end(); // Close the pool connection
    }

    await pool.end(); // Close the pool connection
  }
};

export { bootstrapDatabase };
