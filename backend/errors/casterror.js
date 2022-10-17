const httpStatusCodes = require('../utils/httpstatuscodes');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CastError';
    this.statusCode = httpStatusCodes.BAD_REQUEST;
  }
}

module.exports = CastError;
