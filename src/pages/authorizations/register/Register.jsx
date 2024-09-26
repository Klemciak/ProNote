import React from "react";
import "./Register.scss";

const Register = () => {
  return (
    <div className="register-wrap">
      <h2>Rejestracja</h2>
      <form className="register">
        <input type="email" placeholder="Adres e-mail" />
        <input type="text" placeholder="Nazwa użytkownika" />
        <div className="password">
          <input type="password" placeholder="hasło" />
          <button type="button">pokaż/ukryj</button>
        </div>
        <div className="repeat-password">
          <input type="password" placeholder="powtórz hasło" />
          <button type="button">pokaż/ukryj</button>
        </div>
        <button type="submit">Zarejestruj się</button>
        <span>wiadomość/error</span>
      </form>
      <div className="curtain">
        <h3>Zarejestruj się !</h3>
      </div>
    </div>
  );
};

export default Register;
