import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../apiUrl";
import "./Activate.scss";

const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/activate/${token}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Błąd podczas aktywacji konta");
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage("Nie udało się aktywować konta.");
        console.error("Activation error:", error);
      }
    };

    activateAccount();
  }, [token]);

  return (
    <div className="activate-wrap">
      <div className="activate">
        <h2>Aktywacja konta</h2>
        {message && (
          <>
            <p>{message}</p>
            <button type="button" onClick={() => navigate("/")}>
              Zaloguj się
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Activate;
