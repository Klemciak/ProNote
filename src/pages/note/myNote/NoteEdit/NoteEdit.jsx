import React, { useState } from "react";
import "./NoteEdit.scss";
import Symbols from "../../addingNote/symbols/Symbols";

const NoteEdit = ({ selectedNote, closeEditModal, saveEditedNote }) => {
  const [symbol, setSymbol] = useState(selectedNote.symbol); // Lokalne zarządzanie symbolem
  const [content, setContent] = useState(selectedNote.content); // Lokalne zarządzanie treścią

  // Funkcja do generowania tytułu
  const generateTitle = (text) => {
    const firstLine = text.split("\n")[0]; // Weź tylko pierwszą linijkę
    const words = firstLine.split(" "); // Rozdzielenie tekstu na wyrazy
    let title = "";
    let currentLength = 0;

    for (const word of words) {
      if (currentLength + word.length > 18) break; // Limit długości tytułu
      if (title.length > 0) title += " "; // Dodaj spację między wyrazami
      title += word;
      currentLength += word.length + 1; // Dodaj długość wyrazu i spację
    }

    return title || firstLine.slice(0, 18); // Jeśli nie udało się dodać wyrazów, obetnij pierwszą linijkę
  };

  const handleSave = () => {
    // Generowanie tytułu
    const title = generateTitle(content);

    // Przekazanie zaktualizowanej notatki do nadrzędnego komponentu
    saveEditedNote({
      ...selectedNote,
      symbol,
      content,
      title, // Aktualizujemy tytuł w notatce
    });

    closeEditModal(); // Zamknięcie modala po zapisaniu
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Edytuj notatkę:</h4>

        {/* Symbol z możliwością zmiany */}
        <Symbols currentSymbol={symbol} onChange={setSymbol} />

        {/* Pole tekstowe do edycji treści */}
        <textarea
          className="change-text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="modal-actions">
          <button onClick={handleSave}>Zapisz</button>
          <button onClick={closeEditModal}>Anuluj</button>
        </div>
      </div>
    </div>
  );
};

export default NoteEdit;
