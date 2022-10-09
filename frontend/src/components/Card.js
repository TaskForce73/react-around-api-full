import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
function Card({
  card,
  link,
  name,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `element__bin ${
    isOwn ? "element__bin" : "element__bin_hidden"
  }`;

  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `element__button ${
    isLiked ? "element__button element__button_active" : "element__button"
  }`;
  return (
    <>
      <li className="element">
        <div
          style={{ backgroundImage: `url(${link})` }}
          aria-label={`Photo of ${name}`}
          onClick={handleClick}
          className="element__picture"
        />
        <button
          aria-label="delete"
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleCardDelete}
        ></button>
        <div className="element__title">
          <h2 className="element__header">{name}</h2>
          <div className="element__like-container">
            <button
              aria-label="like"
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleCardLike}
            ></button>
            <span className="element__button-counter">{likes.length}</span>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
