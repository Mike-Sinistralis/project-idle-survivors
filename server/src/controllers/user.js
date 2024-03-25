import Logger from '#root/logger.js';
import { getUserById } from '#root/managers/userManager.js';

const getUserDetails = async (req, res) => {
  if (!req.session.userID) {
    res.status(401).send({ error: 'Not authenticated' });
    return;
  }

  try {
    const user = await getUserById(req.session.userID);

    if (!user) {
      req.session.destroy();
      res.status(500).json({ error: 'No user found for session' });
      return;
    }

    const { userID, username, save } = user;

    res.send({
      message: 'User session has been refreshed', user: { userID, username, save },
    });
  } catch (error) {
    Logger.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  getUserDetails,
};
