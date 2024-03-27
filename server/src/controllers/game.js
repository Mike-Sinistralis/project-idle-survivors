import Logger from 'logger.js';
import { getSaveByUserId } from 'managers/gameManager.js';

const getSavedGame = async (req, res) => {
  if (!req.session.userID) {
    res.status(401).send({ error: 'Not authenticated' });
    return;
  }

  try {
    const saveFile = getSaveByUserId(req.session.userID);
    if (!saveFile) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.send({ save: saveFile.save });
  } catch (error) {
    Logger.error(error);
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
