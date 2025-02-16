import React, { useState, useEffect } from "react";
import "./Clock.scss";

const Clock = ({ onTimeChange, onDateChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      onTimeChange(now.toLocaleTimeString());

      // Zmiana formatu na DD.MM.YYYY
      onDateChange(
        now
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, ".")
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, [onTimeChange, onDateChange]);

  // Formatowanie daty do wyświetlenia w interfejsie
  const formattedDate = currentTime
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  return (
    <div className="clock">
      <span>{currentTime.toLocaleTimeString()}</span>
      <span>{formattedDate}</span>
    </div>
  );
};

export default Clock;
