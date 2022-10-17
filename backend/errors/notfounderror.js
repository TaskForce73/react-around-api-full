const httpStatusCodes = require('../utils/httpstatuscodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = httpStatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
