import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authSquares.scss";
import API_URL from "../../../apiUrl";
import { useAuth } from "../../../components/AuthContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Login = () => {
  const { login } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("uzupełnij wszystkie pola");
      return;
    }

    setLoading(true);

    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("login");
      }
      const responseLogin = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          recaptchaToken,
        }),
      });
      if (responseLogin.status === 200) {
        const data = await responseLogin.json();
        console.log(data); // sprawdzic czy tu bedzie token
        login(data.token); // Upewnij się, że korzystasz z odpowiedniego tokena
        console.log(responseLogin.status);
        // useNavigate('/main') //przekierować po udanym logowaniu
      } else {
        // Obsługa błędów
        if (responseLogin.status === 401) {
          console.error("Błędne dane logowania.");
        } else if (responseLogin.status === 403) {
          console.error("Konto nieaktywne.");
        } else if (responseLogin.status === 404) {
          console.error("Użytkownik nie został znaleziony.");
        } else if (responseLogin.status === 429) {
          setError("Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.");
        } else {
          console.error("Wystąpił nieznany błąd.");
        }
      }
    } catch (error) {
      // Obsługa błędów, które nie są związane z odpowiedzią HTTP
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
