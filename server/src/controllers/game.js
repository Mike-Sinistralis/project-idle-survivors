import pool from '#root/db/pgClient.js';

const getSavedGame = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT test FROM public.hello_world');
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const saveGame = async (req, res) => {
  res.status(500).json({ error: 'Not implemented yet dumdum' });
};

export {
  getSavedGame,
  saveGame,
};
