import React, { useState, useEffect } from "react";
import "./Clock.scss";

const notes = [
  {
    symbol: "!",
    text: "This is a short note with an exclamation mark!",
    date: "2024-10-16",
    time: "10:30:18",
  },
  {
    symbol: "?",
    text: "Here's a slightly longer note with a question mark. What do you think?",
    date: "2024-10-15",
    time: "03:45:11",
  },
  {
    symbol: "✔",
    text: "A much longer note that talks about various completed tasks. ✔ The work was done efficiently, ✔ and everything was checked properly. ✔ Also, we need to consider future improvements.",
    date: "2024-10-14",
    time: "09:10:17",
  },
  {
    symbol: "❤",
    text: "This is a short and sweet note with a heart ❤",
    date: "2024-10-13",
    time: "07:55:12",
  },
];
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
