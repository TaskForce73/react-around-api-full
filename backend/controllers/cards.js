const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/notfounderror');
const CastError = require('../errors/casterror');
const ForbiddenError = require('../errors/forbiddenerror');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('No cards found.');
    })
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card) {
      res.status(200).send({ data: card });
} else {
        throw new CastError('Invalid data.');
      }
})
.catch((err) => {
  if (err.name === 'ValidationError') {
    next(new CastError('Invalid data'));
  } else {
    next(err);
  }
});
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(mongoose.Types.ObjectId(req.params.cardId))
    .orFail(() => {
      throw new NotFoundError('No card found with that id.');
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) res.status(200).send({ data: card });
      else {
        throw new ForbiddenError(
          'Access to the requested resource is forbidden.',
        );
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with that id.');
    })
    .then((user) => {
      if (user) {
      res.status(200).send(user);
} else {
        throw new CastError('Invalid data.');
      }
})
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with that id.');
    })
    .then((user) => {
      if (user) {
      res.status(200).send(user);
} else {
        throw new CastError('Invalid data.');
      }
})
    .catch(next);
};
