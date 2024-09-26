import React from "react";
import "./ForgotPassword.scss";

const forgotPassword = () => {
  return (
    <div className="forgotPassword-wrap">
      <h2>Zapomniałeś hasła ?</h2>
      <p>
        Podaj tu swój e-mail a my prześlemy Ci wiadomość do ustawienia nowego
        hasła
      </p>
      <form className="forgotPassword">
        <input type="email" placeholder="Adres e-mail" />
        <button type="submit">Zatwierdź</button>
        <span>wiadomość/error</span>
      </form>
      <div className="curtain">
        <h3>Zapomniałeś hasła ?</h3>
      </div>
    </div>
  );
};

export default forgotPassword;
