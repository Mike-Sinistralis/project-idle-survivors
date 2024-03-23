import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  // TODO: Don't give the app access to the postgres user in the future
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 20,
});

export default pool;
