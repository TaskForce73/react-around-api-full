
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/authorizationerror');
const { FORBIDDEN } = require('../utils/httpstatuscodes');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')) {
        next(new AuthorizationError('No token found.', FORBIDDEN));
        return;
    }
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
    } catch(err) {
        next(new AuthorizationError('Invalid token.', FORBIDDEN))
    }
    req.user = payload;
    next();
};