const httpStatusCodes = require('./httpstatuscodes');

class AuthorizationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = statusCode || httpStatusCodes.UNAUTHORIZED;
  }
}

module.exports = AuthorizationError;
