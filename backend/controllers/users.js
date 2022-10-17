const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorizationerror');
const NotFoundError = require('../errors/notfounderror');
const ConflictError = require('../errors/conflicterror');
const CastError = require('../errors/casterror');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => {
      if (user) {
      res.status(200).send({ data: user });
} else {
        throw new CastError('Invalid data.');
      }
})
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('User list is empty.');
    })
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((userId) => {
      if (userId) {
      res.status(200).send({ data: userId });
} else {
        throw new CastError('Invalid data.');
      }
})
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
 name, about, avatar, email, password,
} = req.body;
  if (!req.body.password) throw new AuthorizationError('Missing password field.');
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
 name, about, avatar, email, password: hash,
})
.then((user) => {
  if (user) {
    res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    });
} else {
    throw new CastError('Invalid data.');
  }
})
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('User already exists.'));
        } else next(err);
      });
  });
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => {
      if (user) {
      res.status(200).send({ data: user });
} else {
        throw new CastError('Invalid data.');
      }
})
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => {
      if (user) {
      res.status(200).send({ data: user });
} else {
        throw new CastError('Invalid data.');
      }
})
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new AuthorizationError('Incorrect email or password.'))
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (!match) {
            throw new AuthorizationError('Incorrect email or password.');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
