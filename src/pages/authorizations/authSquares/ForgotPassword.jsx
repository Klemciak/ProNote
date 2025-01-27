import React, { useState } from "react";
import "./authSquares.scss";
import API_URL from "../../../apiUrl";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Wpisz swój adress e-mail");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const responseForgotPass = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      if (responseForgotPass.status === 200) {
        setError("Resetowanie powiodło się, sprawdź e-mail.");
      } else {
        setError("Wystąpił problem z resetowaniem hasła.");
      }
    } catch (error) {
      setError("Wystąpił problem z resetowaniem hasła.");
      console.error("Error sending reset password email", error);
    } finally {
      setLoading(false);
      setEmail("");
    }
  };
  return (
    <div className="forgotPassword-wrap">
      <h2>
        Zapomniałeś
        <br />
        hasła?
      </h2>

      <form className="forgotPassword" onSubmit={handleSubmit}>
        <p>
          Podaj tu swój e-mail a my prześlemy Ci wiadomość do ustawienia nowego
          hasła.
        </p>
        <input
          type="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="forgotPassword-button"
          disabled={loading}
        >
          {loading ? "Ładowanie..." : "Zatwierdź"}
        </button>
        <span className="forgotPassword-error">{error}</span>
      </form>
      <div className="curtain">
        <h3>
          Zapomniałeś
          <br />
          hasła ?
        </h3>
      </div>
    </div>
  );
};

export default ForgotPassword;
