const fetchSavedGame = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/game/getSavedGame`, {
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

  const response = await fetch(`${import.meta.env.VITE_API_URL}/game/register`, {
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

  const response = await fetch(`${import.meta.env.VITE_API_URL}/game/login`, {
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
