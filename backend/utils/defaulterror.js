const InternalError = require('./internalerror');

const sendDefaultError = (res, err) => {
  const defaultError = new InternalError('An error has occurred on the server');
  res.status(defaultError.statusCode).send({ message: err.message || defaultError.message });
};

module.exports = sendDefaultError;