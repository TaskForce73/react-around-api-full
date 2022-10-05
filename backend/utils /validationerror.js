const httpStatusCodes = require('./httpstatuscodes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = httpStatusCodes.BAD_REQUEST;
  }
}

module.exports = ValidationError;