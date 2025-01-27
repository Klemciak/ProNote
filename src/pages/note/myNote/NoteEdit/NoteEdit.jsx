import React, { useState } from "react";
import Symbols from "../../addingNote/symbols/Symbols";

const NoteEdit = ({ selectedNote, closeEditModal, saveEditedNote }) => {
  const [symbol, setSymbol] = useState(selectedNote.symbol); // Lokalne zarządzanie symbolem
  const [content, setContent] = useState(selectedNote.content); // Lokalne zarządzanie treścią

  const handleSave = () => {
    // Przekazanie zaktualizowanej notatki do nadrzędnego komponentu
    saveEditedNote({
      ...selectedNote,
      symbol,
      content,
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
