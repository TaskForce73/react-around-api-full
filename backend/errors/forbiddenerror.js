const httpStatusCodes = require('../utils/httpstatuscodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = httpStatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
