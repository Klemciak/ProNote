import React from "react";
import "./ForgotPassword.scss";

const forgotPassword = () => {
  return (
    <div className="forgotPassword-wrap">
      <h2>Zapomniałeś hasła ?</h2>

      <form className="forgotPassword">
        <p>
          Podaj tu swój e-mail a my prześlemy Ci wiadomość do ustawienia nowego
          hasła.
        </p>
        <input type="email" placeholder="Adres e-mail" />
        <button type="submit" className="forgotPassword-button">
          Zatwierdź
        </button>
        <span className="forgotPassword-error">wiadomość/error</span>
      </form>
      <div className="curtain">
        <h3>Zapomniałeś hasła ?</h3>
      </div>
    </div>
  );
};

export default forgotPassword;
