import Logger from 'logger.js';

const bootstrapMigrationsLog = async (pool) => {
  Logger.info('Creating _migrations_log table and inserting data...');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public._migrations_log
    (
        name character varying COLLATE pg_catalog."default" NOT NULL,
        executed_by character varying COLLATE pg_catalog."default" NOT NULL,
        applied_on timestamp without time zone NOT NULL DEFAULT now(),
        CONSTRAINT _migrations_log_pkey PRIMARY KEY (name)
    )

    TABLESPACE pg_default;
    
    ALTER TABLE IF EXISTS public."_migrations_log"
      OWNER to postgres;

    INSERT INTO public._migrations_log (name, executed_by, applied_on) VALUES ('Table Created', 'postgres', now());
  `);

  Logger.info('_migrations_log table created and data inserted successfully');
};

export { bootstrapMigrationsLog };
