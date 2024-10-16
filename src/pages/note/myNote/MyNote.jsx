import React from "react";
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
        </div>
      ))}
    </div>
  );
};

export default MyNote;
