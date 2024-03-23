// Make a 'GET' fetch call to localhost:3000/game/getSavedGame
const fetchSavedGame = async () => {
  const response = await fetch('http://localhost:3000/game/getSavedGame');
  const data = await response.json();

  return data;
};

window.fetchSavedGame = fetchSavedGame;
