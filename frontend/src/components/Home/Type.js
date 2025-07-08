import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Backend Developer",
          "API Specialist",
          "MERN Stack Developer",
          "Full Stack Developer",
          "Web Developer",
          "Freelancer",
          "Open Source Contributor",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
