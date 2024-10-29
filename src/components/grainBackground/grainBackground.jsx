import React from "react";
import "./grainBackground.scss";

const GrainBackground = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="grainBackground"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="3"
          numOctaves="3"
          stitchTiles="stitch"
        >
          <animate
            attributeName="seed"
            from="0"
            to="100"
            dur="7s"
            repeatCount="indefinite"
          />
        </feTurbulence>
      </filter>

      <rect width="1000%" height="1000%" filter="url(#noiseFilter)" />
    </svg>
  );
};

export default GrainBackground;
