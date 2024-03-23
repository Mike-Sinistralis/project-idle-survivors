const saveGame = (req, res) => {
  console.log('Game data received:', req.body); // Log the received game data
  res.status(200).json({ message: 'Game saved successfully' }); // Respond with a success message
};

export {
  saveGame,
};
