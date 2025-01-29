import React, { useState } from "react";
import "./Symbols.scss";

const Symbols = ({ currentSymbol, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const symbols = ["!", "?", "✔", "✘", "❤", "★"];

  const handleSymbolChange = (symbol) => {
    onChange(symbol); // Przekaż nowy symbol do nadrzędnego komponentu
    setShowOptions(false);
  };

  return (
    <div className="symbol">
      <button
        className="main-button"
        type="button"
        onClick={() => setShowOptions(!showOptions)}
      >
        {currentSymbol}
      </button>
      {showOptions && (
        <div className="symbol-options">
          {symbols.map((symbol, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleSymbolChange(symbol)}
            >
              {symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Symbols;
