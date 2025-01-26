import React, { useState } from "react";
import "./authSquares.scss";
import API_URL from "../../../apiUrl.js";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Register = ({ moveToLoginSquare }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleMoveToLogin = () => {
    window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !password || !repeatPassword) {
      setError("Wypełnij wszystkie pola");
      return;
    } else if (username.length > 20) {
      setError("Nazwa użytkownika jest zbyt długa");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Proszę wpisać prawidłowy adres e-mail");
      return;
    } else if (password.length < 8) {
      setError("Hasło powinno składać się minimum z 8 znaków");
      return;
    } else if (password !== repeatPassword) {
      setError("Hasła są różne");
      return;
    }
    setLoading(true);
    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("register");
      }

      const responseEmail = await fetch(
        `${API_URL}/api/auth/check-email/${email}`,
        {
          method: "GET",
        }
      );

      const emailData = await responseEmail.json();
      console.log("Email Data:", emailData);
      if (!emailData.available) {
        setError("Ten e-mail jest juz zarejestrowany");
        return;
      }

      const responseUsername = await fetch(
        `${API_URL}/api/auth/check-username/${username}`,
        {
          method: "GET",
        }
      );
      const usernameData = await responseUsername.json();
      console.log(usernameData);
      if (!usernameData.available) {
        setError("Ta nazwa użytkownika jest zajęta");
        return;
      }

      const registrationResponse = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          recaptchaToken,
        }),
      });
      setRegistered(true);
      if (!registrationResponse.ok) {
        let errorMessage = "Nieznany błąd";
        try {
          const errorData = await registrationResponse.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("Nie udało się sparsować odpowiedzi z błędem:", e);
        }
        throw new Error("Rejestracja nieudana: " + errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof TypeError) {
        setError("Problem z połączeniem sieciowym");
      } else {
        setError(error.message || "Problem podczas rejestracji");
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="register-wrap">
      <h2>Rejestracja</h2>
      <form
        className={`register ${registered ? "registered" : ""}`}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Adres e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          maxLength={20}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <div className="password">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="hasło"
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
        <div className="repeat-password">
          <input
            type={isRepeatPasswordVisible ? "text" : "password"}
            placeholder="powtórz hasło"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            disabled={loading}
          />
          <button
            type="button"
            onClick={toggleRepeatPasswordVisibility}
            aria-label="Toggle repeat password visibility"
            disabled={loading}
          >
            {isRepeatPasswordVisible ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : (
              <span className="material-symbols-outlined">visibility</span>
            )}
          </button>
        </div>
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Sprawdzanie..." : "Zarejestruj się"}
        </button>
        <span className="register-error">{error}</span>
      </form>
      <div className={`reg-successful ${registered ? "registered" : ""}`}>
        <p className="reg-successful-text">
          Twoje konto zostało pomyślnie utworzone. Na podany adres e-mail
          wysłaliśmy wiadomość z potwierdzeniem rejestracji. Proszę sprawdź
          swoją skrzynkę odbiorczą i kliknij w link aktywacyjny, aby w pełni
          aktywować swoje konto.
        </p>
        <button className="reg-successful-login" onClick={handleMoveToLogin}>
          Przejdź do logowania
        </button>
      </div>
      <div className="curtain">
        <h3>
          Zarejestruj
          <br />
          się
        </h3>
      </div>
    </div>
  );
};

export default Register;
