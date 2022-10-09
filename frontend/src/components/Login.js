import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
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
        <h2 className="form__title">Log in</h2>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChangeEmail}
          value={email}
          required
        />
        <input
          className="form__input"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChangePassword}
          value={password}
          required
        />
        <button className="form__submit" type="submit">
          Log in
        </button>
      </form>
      <Link to="/signup" className="form__link">
        Not a member yet? Sign up here!
      </Link>
    </div>
  );
};

export default Login;
