import React from "react";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-wrap">
      <h2>Zaloguj się</h2>
      <form className="login">
        <input type="email" placeholder="Adres e-mail" />
        <div className="password">
          <input type="password" placeholder="Hasło" />
          <button type="button">pokaż/ukryj hasło</button>
        </div>
        <button type="submit">Zaloguj się</button>
        <span>wiadomość/error</span>
      </form>
      <div className="curtain">
        <h3>Logowanie</h3>
      </div>
    </div>
  );
};

export default Login;
