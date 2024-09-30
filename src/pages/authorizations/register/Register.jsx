import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="register-wrap">
      <h2>Rejestracja</h2>
      <form className="register">
        <input type="email" placeholder="Adres e-mail" />
        <input type="text" placeholder="Nazwa użytkownika" />
        <div className="password">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="hasło"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
          >
            {isPasswordVisible ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : (
              <span className="material-symbols-outlined">visibility</span>
            )}
          </button>
        </div>
        <div className="repeat-password">
          <input
            type={isRepeatPasswordVisible ? "text" : "password"}
            placeholder="powtórz hasło"
          />
          <button
            type="button"
            onClick={toggleRepeatPasswordVisibility}
            aria-label="Toggle repeat password visibility"
          >
            {isRepeatPasswordVisible ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : (
              <span className="material-symbols-outlined">visibility</span>
            )}
          </button>
        </div>
        <button type="submit" className="register-button">
          Zarejestruj się
        </button>
        <span className="register-error">wiadomość/error</span>
      </form>
      <div className="curtain">
        <h3>Zarejestruj się</h3>
      </div>
    </div>
  );
};

export default Register;
