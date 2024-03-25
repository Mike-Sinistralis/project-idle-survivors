class SessionPersistanceError extends Error {
  constructor(user) {
    super(`Could not save session for ${user?.username || 'unknown user'}`);
    this.name = 'SessionPersistanceError';
    this.user = user;
  }
}

export default SessionPersistanceError;
