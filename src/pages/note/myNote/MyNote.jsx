import React, { useState, useEffect } from "react";
import "./MyNote.scss";
import API_URL from "../../../apiUrl";
import NoteEdit from "./NoteEdit/NoteEdit";
const MyNote = ({ notes, filters, sortOption, refreshNotes }) => {
  const [showDropdown, setShowDropdown] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [sortedNotes, setSortedNotes] = useState([]);

  useEffect(() => {
    // Filtrowanie notatek na podstawie symboli
    const filteredNotes = notes.filter((note) => {
      if (Object.keys(filters).length === 0) return true; // Jeśli brak filtrów, wszystkie notatki
      return filters[note.symbol] || !Object.values(filters).includes(true);
    });

    // Sortowanie notatek
    let sorted = [...filteredNotes];

    if (sortOption === "najnowsze") {
      sorted = filteredNotes; // Odwrócenie kolejności, by najnowsze były na górze
    } else if (sortOption === "najstarsze") {
      // Jeśli masz sortowanie od najstarszych do najnowszych, to nic nie musisz zmieniać,
      // bo API już zwraca je w tej kolejności
      sorted = filteredNotes.slice().reverse();
    } else if (sortOption === "a-do-z") {
      sorted.sort((a, b) => b.content.localeCompare(a.content)); // A do Z
    } else if (sortOption === "z-do-a") {
      sorted.sort((a, b) => a.content.localeCompare(b.content)); // Z do A
    }

    setSortedNotes(sorted);
  }, [notes, filters, sortOption]);

  const toggleDropdown = (index) => {
    setShowDropdown(showDropdown === index ? null : index);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
    setShowDropdown(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedNote(null);
  };

  const handleDelete = async (note) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Zaloguj się, aby usunąć notatkę.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/notes/${note.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Błąd podczas usuwania notatki.");
      }

      setShowDropdown(null);
      refreshNotes(); // Odśwież listę notatek
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił problem podczas usuwania notatki.");
    }
  };
  const saveEditedNote = async (updatedNote) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Zaloguj się, aby edytować notatkę.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/notes/${updatedNote.id}`, {
        method: "PUT", // PUT, aby edytować istniejącą notatkę
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNote),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas edycji notatki.");
      }

      refreshNotes(); // Odświeżenie listy notatek po edycji
    } catch (error) {
      console.error("Błąd:", error);
      alert("Wystąpił problem podczas edytowania notatki.");
    }
  };
  return (
    <div className="myNote-wrap">
      {sortedNotes
        .slice()
        .reverse()
        .map((note, index) => (
          <div key={index} className="note-item">
            <h3>{note.symbol}</h3>
            <div className="note-item-text">
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>

            <div className="note-info">
              <span className="note-date">{note.date}</span>
              <span className="note-time">{note.time}</span>
            </div>
            <button
              className="options-button"
              onClick={() => toggleDropdown(index)}
            >
              <span className="material-symbols-outlined">more_horiz</span>
            </button>

            {showDropdown === index && (
              <div className="dropdown">
                <button onClick={() => openEditModal(note)}>Edytuj</button>
                <button onClick={() => handleDelete(note)}>Usuń</button>
              </div>
            )}
          </div>
        ))}

      {showEditModal && (
        <NoteEdit
          selectedNote={selectedNote}
          closeEditModal={closeEditModal}
          saveEditedNote={saveEditedNote}
        />
      )}
    </div>
  );
};

export default MyNote;
