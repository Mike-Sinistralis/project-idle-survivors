import Logger from 'logger.js';

const bootstrapUserSession = async (pool) => {
  Logger.info('Creating user table and inserting data...');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "user-session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    ) WITH (OIDS=FALSE)

    TABLESPACE pg_default;

    ALTER TABLE "user-session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
    
    ALTER TABLE IF EXISTS public."user"
      OWNER to postgres;
  `);

  Logger.info('user-session created and data inserted successfully');
};

export { bootstrapUserSession };
