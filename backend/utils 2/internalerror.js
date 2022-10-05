const httpStatusCodes = require('./httpstatuscodes');

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = httpStatusCodes.INTERNAL_SERVER;
  }
}

module.exports = InternalError;