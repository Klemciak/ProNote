import React, { useState } from "react";
import "./Symbols.scss";
const Symbols = () => {
  const [currentSymbol, setCurrentSymbol] = useState("!");
  const [showOptions, setShowOptions] = useState(false);

  const symbols = ["!", "?", "✔", "✘", "❤", "★"];

  const handleSymbolChange = (symbol) => {
    setCurrentSymbol(symbol);
    setShowOptions(false);
  };
  return (
    <div className="symbol">
      <button type="button" onClick={() => setShowOptions(!showOptions)}>
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
