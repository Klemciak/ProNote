import React, { useState } from "react";
import "./Authorizations.scss";
import Login from "./authSquares/Login";
import Register from "./authSquares/Register";
import Reset from "./authSquares/ForgotPassword";
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
        <Register />
      </div>

      <div
        className={`login-square ${classes[1]}`}
        onClick={() => handleClick(1)}
      >
        <Login />
      </div>

      <div
        className={`resetPassword-square ${classes[2]}`}
        onClick={() => handleClick(2)}
      >
        <Reset />
      </div>
    </div>
  );
};

export default Authorizations;
