import React from "react";
import "./Note.scss";
import AddingNote from "./addingNote/addingNote";
import Sort from "./sort/Sort";
import MyNote from "./myNote/MyNote";
const Note = () => {
  return (
    <div className="notePage-wrap">
      <AddingNote />
      <div className="main-wrap">
        <Sort />
        <MyNote />
      </div>
    </div>
  );
};

export default Note;
