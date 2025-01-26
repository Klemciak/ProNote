import React, { useState } from "react";
import Symbols from "./symbols/Symbols";
import Clock from "./clock/Clock";
import "./addingNote.scss";
import API_URL from "../../../apiUrl";

const AddingNote = ({ refreshNotes }) => {
  const [symbol, setSymbol] = useState("!");
  const [content, setContent] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const handleSymbolChange = (newSymbol) => {
    setSymbol(newSymbol);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Zaloguj się, aby dodać notatkę.");
      return;
    }

    // Funkcja do tworzenia tytułu
    const generateTitle = (text) => {
      const firstLine = text.split("\n")[0]; // Weź tylko pierwszą linijkę
      const words = firstLine.split(" "); // Rozdzielenie tekstu na wyrazy
      let title = "";
      let currentLength = 0;

      for (const word of words) {
        if (currentLength + word.length > 18) break; // Jeśli dodanie kolejnego wyrazu przekroczy limit, przerywamy pętlę
        if (title.length > 0) title += " "; // Dodaj spację między wyrazami
        title += word;
        currentLength += word.length + 1; // Dodaj długość wyrazu i jedną spację
      }

      return title || firstLine.slice(0, 18); // Jeśli nie udało się dodać wyrazów, obetnij pierwszą linijkę do 18 znaków
    };

    const newNote = {
      title: generateTitle(content), // Generowanie tytułu na podstawie tekstu
      symbol: symbol,
      content: content,
      time: time,
      date: date,
    };

    try {
      const response = await fetch(`${API_URL}/api/notes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas tworzenia notatki.");
      }

      refreshNotes(); // Wywołanie funkcji do odświeżenia listy notatek
      setContent("");
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return (
    <form className="addingNote-wrap" onSubmit={handleSubmit}>
      <div className="addingNote">
        <Symbols currentSymbol={symbol} onChange={handleSymbolChange} />
        <div className="note">
          <textarea
            placeholder="Wpisz tekst..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Clock onTimeChange={setTime} onDateChange={setDate} />
        </div>
      </div>
      <button className="addingNote-button" type="submit">
        + Dodaj
        <br /> notatkę
      </button>
    </form>
  );
};

export default AddingNote;
