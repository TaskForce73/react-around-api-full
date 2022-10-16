const Card = require('../models/card');
const mongoose = require('mongoose');
const AuthorizationError = require('../utils/authorizationerror');
const NotFoundError = require('../utils/notfounderror');

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
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(mongoose.Types.ObjectId(req.params.cardId))
  .orFail(() => {
    throw new NotFoundError('No card found with that id.');
  })
    .then((card) => {
      if (card.owner.equals(req.user._id)) res.status(200).send({data : card});
      else {
        throw new AuthorizationError(
          'You may not delete cards that do not belong to you.')
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
      res.status(200).send(user);
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
      res.status(200).send(user);
    })
.catch(next);
};
