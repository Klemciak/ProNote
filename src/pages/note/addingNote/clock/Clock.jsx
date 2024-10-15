import React, { useState, useEffect } from "react";
import "./Clock.scss";
const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock">
      <span>{formattedTime}</span>
      <span>{formattedDate}</span>
    </div>
  );
};

export default Clock;
