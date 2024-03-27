import SessionPersistanceError from 'errors/SessionPersistanceError.js';
import Logger from 'logger.js';

const initializeSession = async (req, user) => {
  Logger.info(`Creating session for ${user.username} with ID ${user.userID}`);

  req.session.userID = user.userID;
  req.session.userName = user.username;

  await new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) {
        reject(SessionPersistanceError(user));
      } else {
        resolve();
      }
    });
  });

  const sessionKey = req.sessionID;
  Logger.info(`Session created for ${user.username} with ID ${user.userID} and session ID ${sessionKey}`);
  return sessionKey;
};

const destroySession = async (req) => {
  const { username, userID } = req.session;
  Logger.info(`Destroying session for ${username} with ID ${userID}`);

  req.session?.destroy?.();
};

export {
  initializeSession,
  destroySession,
};
