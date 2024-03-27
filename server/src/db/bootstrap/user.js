import Logger from 'logger.js';

const bootstrapUsers = async (pool) => {
  Logger.info('Creating user table and inserting data...');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public."user"
    (
        "userID" SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password character varying COLLATE pg_catalog."default" NOT NULL,
        save json NOT NULL DEFAULT '{}'
    )
    
    TABLESPACE pg_default;
    
    ALTER TABLE IF EXISTS public."user"
      OWNER to postgres;
  `);

  Logger.info('user table created and data inserted successfully');
};

export { bootstrapUsers };
