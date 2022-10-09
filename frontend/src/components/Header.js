import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/header.svg';

const Header = ({ isLoggedIn, handleLogout, userEmail }) => {
  const location = useLocation().pathname;
  const link = location === '/signin' ? '/signup' : '/signin';
  const linkText = link === '/signin' ? 'Log In' : 'Sign up';

  return isLoggedIn ? (
    <header className="header__small">
      <img src={headerLogo} alt="Around the U.S" className="header__image" />
      <div className="header__container">
        <p className="header__user-small">{userEmail}</p>
        <Link
          to={'/signin'}
          className="header__link-small"
          onClick={handleLogout}
        >
          {'Log out'}
        </Link>
      </div>
    </header>
  ) : (
    <header className="header">
      <img src={headerLogo} alt="Around the U.S" className="header__image" />
      <Link to={link} className="header__link" onClick={handleLogout}>
        {linkText}
      </Link>
    </header>
  );
};

export default Header;
