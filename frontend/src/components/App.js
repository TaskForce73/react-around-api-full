import React, { useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import Register from './Register.js';
import Login from './Login.js';
import InfoToolTip from './InfoToolTip';
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { register, authorize, validateToken } from '../utils/auth';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [removeCard, setRemoveCard] = React.useState({});
  const [changePopupButtonText, setChangePopupButtonText] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));

  function handleEditProfileClick() {
    setChangePopupButtonText('Save');
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setChangePopupButtonText('Save');
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setChangePopupButtonText('Save');
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setRemoveCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  useEffect(() => {
    if (token) {
      api
        .getUserInfo(token)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  function handleUpdateUser({ name, about }) {
    setChangePopupButtonText('Saving...');
    api
      .editProfile({ name, about }, token)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    setChangePopupButtonText('Saving...');
    api
      .changeAvatar(avatar, token)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards(cards.filter((currentCard) => currentCard._id !== card._id));
      })
      .then(() => {
        setIsConfirmPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (token) {
      api
        .getInitialCards(token)
        .then((res) => {
          setCards(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  function handleAddPlaceSubmit({ name, link }) {
    setChangePopupButtonText('Saving...');
    api
      .createCard({ name, link }, token)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard.data, ...cards]);
      })
      .then(() => {
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogin = (password, email) => {
    authorize(password, email)
      .then((user) => {
        if (user.token) {
          localStorage.setItem('jwt', user.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          setToken(user.token);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoToolTipPopupOpen(true);
      });
  };

  const handleRegister = (email, password) => {
    register(email, password)
      .then(() => {
        setIsRegistered(true);
        navigate('./signin');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
      })
      .finally(() => {
        setIsInfoToolTipPopupOpen(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      validateToken(token)
        .then((res) => {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setIsLoggedIn(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="main">
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          userEmail={userEmail}
        />
        <Routes>
          <Route
            path="/signin"
            element={<Login onSubmit={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/signup"
            element={
              <Register onSubmit={handleRegister} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          buttonText={changePopupButtonText}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={changePopupButtonText}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={changePopupButtonText}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={removeCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoToolTip
          name="info"
          onClose={closeAllPopups}
          status={isRegistered}
          isOpen={isInfoToolTipPopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
