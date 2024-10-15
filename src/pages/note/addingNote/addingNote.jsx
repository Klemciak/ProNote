import React from "react";
import Symbols from "./symbols/Symbols";
import Clock from "./clock/Clock";
import "./addingNote.scss";
const addingNote = () => {
  return (
    <form className="addingNote-wrap">
      <div className="addingNote">
        <Symbols />
        <div className="note">
          <textarea placeholder="Wpisz tekst..." />
          <Clock />
        </div>
      </div>
      <button className="addingNote-button" type="submit">
        + Dodaj
        <br /> notatkę
      </button>
    </form>
  );
};

export default addingNote;
