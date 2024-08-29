import React, { useState } from "react";
import "./Authorizations.scss";

const Authorizations = () => {
  const [classes, setClasses] = useState(["first", "second", "third"]);

  const handleClick = (index) => {
    const newClasses = [...classes];
    switch (newClasses[index]) {
      case "first":
        const secondIndex = newClasses.indexOf("second");
        newClasses[index] = "second";
        newClasses[secondIndex] = "first";
        break;
      case "third":
        const thirdIndex = newClasses.indexOf("second");
        newClasses[index] = "second";
        newClasses[thirdIndex] = "third";
        break;
      default:
        break;
    }

    setClasses(newClasses);
  };

  return (
    <div className="authorizations-container">
      <div
        className={`register-square ${classes[0]}`}
        onClick={() => handleClick(0)}
      >
        <p>First Square</p>
        <p>More Text Here</p>
        <img src="https://via.placeholder.com/50" alt="Placeholder" />
      </div>

      <div
        className={`login-square ${classes[1]}`}
        onClick={() => handleClick(1)}
      >
        <p>Second Square</p>
        <p>Additional Content</p>
      </div>

      <div
        className={`resetPassword-square ${classes[2]}`}
        onClick={() => handleClick(2)}
      >
        <p>Third Square</p>
        <p>Different Content</p>
        <p>Even More Text</p>
      </div>
    </div>
  );
};

export default Authorizations;
