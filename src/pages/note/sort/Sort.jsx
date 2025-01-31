import React, { useState } from "react";
import "./Sort.scss";

const Sort = ({ onFilterChange, onSortChange }) => {
  const [checkedSymbols, setCheckedSymbols] = useState({
    "!": false,
    "?": false,
    "✔": false,
    "✘": false,
    "❤": false,
    "★": false,
  });

  const [selectedOption, setSelectedOption] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedSymbols((prev) => ({
      ...prev,
      [name]: checked,
    }));
    onFilterChange(name, checked); // Przekazujemy zmiany do rodzica
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSortChange(value); // Przekazujemy wybraną opcję sortowania
  };

  return (
    <div className="sort-wrap">
      <div className="sortBy">
        <h3>Sortuj od:</h3>
        <select id="options" value={selectedOption} onChange={handleSortChange}>
          <option value="" disabled>
            -- Wybierz --
          </option>
          <option value="najnowsze">Najnowszych</option>
          <option value="najstarsze">Najstarszych</option>
          <option value="a-do-z">A do Z</option>
          <option value="z-do-a">Z do A</option>
        </select>
      </div>

      <div className="sortIcons">
        <h3>Pokaż:</h3>
        <div className="sortIcons-boxes">
          {Object.keys(checkedSymbols).map((symbol) => (
            <label key={symbol}>
              <input
                type="checkbox"
                name={symbol}
                checked={checkedSymbols[symbol]}
                onChange={handleCheckboxChange}
              />
              <span>{symbol}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sort;
