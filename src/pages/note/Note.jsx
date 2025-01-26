import React, { useState, useEffect } from "react";
import "./Note.scss";
import AddingNote from "./addingNote/addingNote";
import Sort from "./sort/Sort";
import MyNote from "./myNote/MyNote";
import API_URL from "../../apiUrl";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("");

  // Funkcja pobierająca notatki
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Brak tokena w localStorage!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Błąd podczas pobierania danych: ${response.status}`);
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  // Pobranie notatek po załadowaniu komponentu
  useEffect(() => {
    fetchNotes();
  }, []);

  // Funkcja do obsługi filtrów
  const handleFilterChange = (symbol, isChecked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [symbol]: isChecked,
    }));
  };

  // Funkcja do obsługi zmiany opcji sortowania
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="notePage-wrap">
      <AddingNote refreshNotes={fetchNotes} />
      <div className="main-wrap">
        <Sort
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <MyNote
          notes={notes}
          filters={filters}
          sortOption={sortOption}
          refreshNotes={fetchNotes}
        />
      </div>
    </div>
  );
};

export default Note;
