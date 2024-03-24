import Logger from '#root/logger.js';

const bootstrapHelloWorld = async (pool) => {
  Logger.info('Creating hello_world table and inserting data...');

  await pool.query('CREATE TABLE hello_world (test VARCHAR)');
  await pool.query('INSERT INTO hello_world (test) VALUES ($1)', ['hi']);

  Logger.info('hello_world table created and data inserted successfully');
};

export { bootstrapHelloWorld };
