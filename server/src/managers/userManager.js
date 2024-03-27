import { pool } from 'db/pgClient.js';
import Logger from 'logger.js';

const getUserById = async (userID) => {
  Logger.info(`Getting user details for ${userID}`);

  const { rows } = await pool.query(`
    SELECT * 
    FROM public.user
    WHERE "userID" = $1
  `, [userID]);

  return rows[0];
};

export {
  getUserById,
};
