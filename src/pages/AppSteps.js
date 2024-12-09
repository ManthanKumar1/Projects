import React from "react";
import "./AppSteps.css"; // External CSS for styling
import Resolve from "../assests/removebgprevie.png";
const AppSteps = () => {
  return (
    <div className="app-steps-container">
      <h1 className="app-steps-title">Steps for App Designing</h1>
      <div className="app-steps-content">
        <div className="app-steps-text">
          <p>
            Designing a car parking app involves several key steps to ensure a
            user-friendly and efficient experience. Here’s an outline of the
            process:
          </p>
          <ol>
            <li>
              <strong>Wireframing and Prototyping:</strong> Create wireframes
              for the app's layout to map out the flow and functionality.
              Prototypes with clickable features help simulate user experience
              and identify potential issues before finalizing the design.
            </li>
            <li>
              <strong>UI/UX Design:</strong> Design an intuitive, visually
              appealing interface that aligns with the app’s brand. Ensure
              buttons, navigation paths, and icons are user-friendly. The user
              experience (UX) should minimize steps needed to complete tasks
              like finding or reserving a spot.
            </li>
            <li>
              <strong>Development:</strong> Build the app with a tech stack that
              supports GPS tracking, real-time data, secure payments, and
              managing databases. Frontend and backend development teams work on
              coding the app, integrating features, and setting up databases.
            </li>
            <li>
              <strong>Testing and Feedback:</strong> Test the app for usability,
              functionality, and compatibility across devices. Gather feedback
              through beta testing to address any user challenges and refine
              features for seamless operation.
            </li>
            <li>
              <strong>Launch and Post-Launch Optimization:</strong> Launch the
              app on platforms like iOS and Android. Continue monitoring
              performance, collecting user feedback, and updating features or
              fixing bugs for an optimized experience.
            </li>
          </ol>
        </div>
        <div className="app-steps-image">
          <img src={Resolve} alt="App Designing Steps" />
        </div>
      </div>
    </div>
  );
};

export default AppSteps;
