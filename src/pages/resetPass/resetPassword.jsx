import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../apiUrl";
import "./resetPassword.scss";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("Wprowadź nowe hasło.");
      return;
    } else if (!password || password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        setError("Resetowanie hasła powiodło się.");
        setTimeout(() => navigate("/"), 3000);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setError("Nie udało się zresetować hasła");
      }
    } catch (error) {
      setError("Nie udało się zresetować hasła");
      console.error("Error resetting password", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="ResetPassword-wrap">
      <div className="ResetPassword">
        <h2>Resetowanie hasła</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Podaj nowe hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Ładowanie" : "Zresetuj hasło"}
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
