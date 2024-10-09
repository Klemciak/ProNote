import React, { useState } from "react";
import "./authSquares.scss";
import API_URL from "../../../apiUrl.js";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!username || !email || !password || !repeatPassword) {
      setError("Wypełnij wszystkie pola");
      return;
    } else if (username.length > 20) {
      setError("Nazwa użytkownika jest zbyt długa");
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
      console.log(recaptchaToken);
      const responseEmail = await fetch(
        `${API_URL}/api/auth/check-email/${email}`,
        {
          method: "GET",
        }
      );
      const emailData = await responseEmail.json();
      if (!emailData.available) {
        setError("Ten e-mail jest juz zarejestrowany");
        return;
      }
      const responseUsername = await fetch(
        `${API_URL}/api/auth/check-email/${email}`,
        {
          method: "GET",
        }
      );
      const usernameData = await responseUsername.json();
      if (!usernameData.available) {
        setError("Ta nazwa użytkownika jest zajęta");
        return;
      }

      const registrationResponse = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          recaptchaToken,
        }),
      });

      if (!registrationResponse.ok) {
        throw new Error("rejestracja nieudana");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Problem podczas rejestracji");
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
      <form className="register" onSubmit={handleSubmit}>
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
          maxLength={30}
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
