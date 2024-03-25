import { pool } from '#root/db/pgClient.js';
import Logger from '#root/logger.js';

const getSaveByUserId = async (userID) => {
  Logger.info(`Getting save for user ${userID}`);

  const { rows } = await pool.query(`
    SELECT save
    FROM public.user
    WHERE "userID" = $1
  `, [userID]);

  return rows[0];
};

export {
  getSaveByUserId,
};
