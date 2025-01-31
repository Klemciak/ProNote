import React, { useState, useEffect } from "react";
import API_URL from "../../../apiUrl";
import "./Nick.scss";
const Nick = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Nie udało się pobrać nazwy użytkownika.");
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Błąd pobierania profilu:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return <div className="nick">Użytkownik: {username}</div>;
};

export default Nick;
