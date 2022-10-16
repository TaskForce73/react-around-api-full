import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page">
      <section className="profile">
        <div onClick={onEditAvatarClick} className="profile__overlay"></div>
        {currentUser.data.avatar && (
          <div
            style={{ backgroundImage: `url(${currentUser.data.avatar})` }}
            aria-label="avatar"
            className="profile__image"
          />
        )}
        <div className="profile__info">
          <h1 className="profile__author">{currentUser.data.name}</h1>
          <button
            onClick={onEditProfileClick}
            aria-label="edit"
            type="button"
            className="profile__edit"
          ></button>
          <p className="profile__text">{currentUser.data.about}</p>
        </div>
        <button
          onClick={onAddPlaceClick}
          aria-label="add"
          type="button"
          className="profile__plus submit-button"
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((data) => (
            <Card
              name={data.name}
              link={data.link}
              likes={data.likes}
              key={data._id}
              card={data}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
