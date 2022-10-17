const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const {
  getUsers,
  getUser,
  getUserById,
  createUser,
  login,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const validateLink = (value, helpers) => (
  validator.isURL(value) ? value : helpers.error('string.uri'));

router.get('/', auth, getUsers);

router.get('/users', getUsers);

router.get('/users/me', auth, getUser);

router.get(
  '/users/:id',
  auth,
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().min(24).max(24).required(),
    }),
  }),
  getUserById,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(30),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateLink),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
    }),
  }),
  updateProfile,
);

router.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateLink),
    }),
  }),
  updateAvatar,
);
module.exports = router;
