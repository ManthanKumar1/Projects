import React from "react";
import "./AppSteps.css"; // External CSS for styling
import Resolve from "../assests/removebgprevie.png";
const AppSteps = () => {
  const steps = [
    {
      title: "Wireframing and Prototyping",
      description:
        "Create wireframes for the app's layout to map out the flow and functionality. Prototypes with clickable features help simulate user experience and identify potential issues before finalizing the design.",
    },
    {
      title: "UI/UX Design",
      description:
        "Design an intuitive, visually appealing interface that aligns with the app's brand. Ensure buttons, navigation paths, and icons are user-friendly. The user experience (UX) should minimize steps needed to complete tasks like finding or reserving a spot.",
    },
    {
      title: "Development",
      description:
        "Build the app with a tech stack that supports GPS tracking, real-time data, secure payments, and user authentication. Frontend and backend development teams work on coding the app, integrating features, and setting up databases.",
    },
    {
      title: "Testing and Feedback",
      description:
        "Test the app for usability, functionality, and compatibility across devices. Gather feedback through beta testing to address any user challenges and refine features for seamless operation.",
    },
    {
      title: "Launch and Post-Launch Optimization",
      description:
        "Launch the app on platforms like iOS and Android. Continue monitoring performance, collecting user feedback, and updating features or fixing bugs for an optimized experience.",
    },
  ];
  return (
    <div className="app-steps-container">
      {/* <h1 className="app-steps-title">Steps for App Designing</h1> */}
      <div className="app-steps-content">
        <div>
          <h1 className="app-steps-title">
            Steps for App
            <br /> Designing
          </h1>
          <p>
            Designing a car parking app involves <br />
            several key steps to ensure a user-friendly <br /> and efficient
            experience. Here’s an outline <br /> of the process:
          </p>
        </div>
        <div className="app-steps-image">
          <img src={Resolve} alt="App Designing Steps" />
        </div>
      </div>
      <div className="process-container">
        <ul className="process-list">
          {steps.map((step, index) => (
            <li key={index} className="process-item">
              <h3 className="process-title">
                {index + 1}. {step.title}
              </h3>
              <p className="process-description">{step.description}</p>
            </li>
          ))}
        </ul>
        <p className="process-footer">
          This structured approach ensures that the app is not only functional
          but also user-centered, catering to the needs of everyday drivers.
        </p>
      </div>
    </div>
  );
};

export default AppSteps;
