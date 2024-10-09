import React, { useState } from "react";
import "./authSquares.scss";
import API_URL from "../../../apiUrl";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("uzupełnij wszystkie pola");
      return;
    }

    setLoading(true);

    try {
      const responseLogin = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (responseLogin.status === 200) {
        const data = await responseLogin.json();
        console.log(data); //sprawdzic czy tu bedzie token
      } else {
        if (responseLogin.status === 401) {
          console.error("Błędne dane logowania.");
        } else if (responseLogin.status === 403) {
          console.error("Konto nieaktywne.");
        } else if (responseLogin.status === 404) {
          console.error("Użytkownik nie został znaleziony.");
        } else if (error.response.status === 429) {
          setError("Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.");
        } else {
          console.error("Wystąpił nieznany błąd.");
        }
      }
    } catch (error) {
      console.error("Wystąpił problem z połączeniem:", error);
    } finally {
      setLoading(false);
    }
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="login-wrap">
      <h2>Logowanie</h2>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <div className="password">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label="Toggle password visibility"
            disabled={loading}
          >
            {isPasswordVisible ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : (
              <span className="material-symbols-outlined">visibility</span>
            )}
          </button>
        </div>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Sprawdzanie..." : "Zaloguj się"}
        </button>
        <span className="login-error">{error}</span>
      </form>
      <div className="curtain">
        <h3>Logowanie</h3>
      </div>
    </div>
  );
};

export default Login;
