const httpStatusCodes = require('./httpstatuscodes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = httpStatusCodes.REQUEST_CONFLICT;
  }
}

module.exports = ConflictError;