import React, { useState } from "react";
import "./MyNote.scss";
const notes = [
  {
    symbol: "!",
    text: "This is a short note with an exclamation mark!",
    date: "2024-10-16",
    time: "10:30:18",
  },
  {
    symbol: "?",
    text: "Here's a slightly longer note with a question mark. What do you think?",
    date: "2024-10-15",
    time: "03:45:11",
  },
  {
    symbol: "✔",
    text: "A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements. A m much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements. A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements. A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvementsuch longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements.",
    date: "2024-10-14",
    time: "09:10:17",
  },
  {
    symbol: "❤",
    text: "This is a short and sweet note with a heart ❤",
    date: "2024-10-13",
    time: "07:55:12",
  },
  {
    symbol: "!",
    text: "This is a short note with an exclamation mark!",
    date: "2024-10-16",
    time: "10:30:18",
  },
  {
    symbol: "?",
    text: "Here's a slightly longer note with a question mark. What do you think?",
    date: "2024-10-15",
    time: "03:45:11",
  },
  {
    symbol: "✔",
    text: "A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements. A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements.",
    date: "2024-10-14",
    time: "09:10:17",
  },
  {
    symbol: "❤",
    text: "This is a short and sweet note with a heart ❤",
    date: "2024-10-13",
    time: "07:55:12",
  },
  {
    symbol: "!",
    text: "This is a short note with an exclamation mark!",
    date: "2024-10-16",
    time: "10:30:18",
  },
  {
    symbol: "?",
    text: "Here's a slightly longer note with a question mark. What do you think?",
    date: "2024-10-15",
    time: "03:45:11",
  },
  {
    symbol: "✔",
    text: "A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements. A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements.",
    date: "2024-10-14",
    time: "09:10:17",
  },
  {
    symbol: "❤",
    text: "This is a short and sweet note with a heart ❤",
    date: "2024-10-13",
    time: "07:55:12",
  },
];
const MyNote = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleDelete = (note) => {
    alert(`Usuwanie notatki: ${note.text}`);
    setShowDropdown(null);
  };

  return (
    <div className="myNote-wrap">
      {notes.map((note, index) => (
        <div key={index} className="note-item">
          <h3>{note.symbol}</h3>
          <p>{note.text}</p>
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

      {/* Modal do edytowania */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h4>Edytuj notatkę:</h4>
            <textarea defaultValue={selectedNote.text}></textarea>
            <div className="modal-actions">
              <button>Zapisz</button>
              <button onClick={closeEditModal}>Anuluj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNote;
