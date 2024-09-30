import React, { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="login-wrap">
      <h2>Logowanie</h2>
      <form className="login">
        <input type="email" placeholder="Adres e-mail" />
        <div className="password">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Hasło"
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
        <button className="login-button" type="submit">
          Zaloguj się
        </button>
        <span className="login-error">wiadomość/error</span>
      </form>
      <div className="curtain">
        <h3>Logowanie</h3>
      </div>
    </div>
  );
};

export default Login;
