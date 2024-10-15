import React, { useState } from "react";
import "./Sort.scss";
const Sort = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div className="sort-wrap">
      <div className="sortBy">
        <h3>Sortuj od:</h3>
        <select id="options" value={selectedOption} onChange={handleChange}>
          <option value="" disabled>
            -- Wybierz --
          </option>
          <option value="option1">Najnowszych</option>
          <option value="option2">Najstarszych</option>
          <option value="option3">A do Z</option>
          <option value="option4">Z do A</option>
        </select>
      </div>
      <div className="sortIcons">
        <label>
          !
          <input type="checkbox" />
        </label>
        <label>
          ?
          <input type="checkbox" />
        </label>
        <label>
          ✔
          <input type="checkbox" />
        </label>

        <label>
          ✘
          <input type="checkbox" />
        </label>
        <label>
          ❤
          <input type="checkbox" />
        </label>
        <label>
          ★
          <input type="checkbox" />
        </label>
      </div>
    </div>
  );
};

export default Sort;
// const symbols = ["!", "?", "✔", "✘", "❤", "★"];
