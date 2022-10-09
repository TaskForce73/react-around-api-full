import React from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const { onSubmit } = props;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password, email);
  };

  return (
    <div className="form__wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Sign Up</h2>
        <input
          className="form__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChangeEmail}
          value={email}
          required
        />
        <input
          className="form__input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChangePassword}
          value={password}
          required
        />

        <button className="form__submit" type="submit">
          Sign Up
        </button>
      </form>
      <Link to="/signin" className="form__link">
        Already a member? Log in here!
      </Link>
    </div>
  );
};

export default Register;
