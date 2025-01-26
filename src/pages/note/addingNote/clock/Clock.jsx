import React, { useState, useEffect } from "react";
import "./Clock.scss";

const Clock = ({ onTimeChange, onDateChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      onTimeChange(now.toLocaleTimeString());
      onDateChange(now.toLocaleDateString());
    }, 1000);

    return () => clearInterval(timerId);
  }, [onTimeChange, onDateChange]);

  return (
    <div className="clock">
      <span>{currentTime.toLocaleTimeString()}</span>
      <span>{currentTime.toLocaleDateString()}</span>
    </div>
  );
};

export default Clock;
