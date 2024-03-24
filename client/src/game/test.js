// Make a 'GET' fetch call to localhost:3000/game/getSavedGame
const fetchSavedGame = async () => {
  const response = await fetch('http://localhost:3000/game/getSavedGame', {
    credentials: 'include',
  });
  const data = await response.json();

  return data;
};

window.fetchSavedGame = fetchSavedGame;

const register = async (username, password) => {
  const inputs = {
    username,
    password,
  };

  const response = await fetch('http://localhost:3000/game/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  });

  const data = await response.json();

  return data;
};

window.register = register;

const login = async (username, password) => {
  const inputs = {
    username,
    password,
  };

  const response = await fetch('http://localhost:3000/game/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  });

  const data = await response.json();

  return data;
};

window.login = login;
